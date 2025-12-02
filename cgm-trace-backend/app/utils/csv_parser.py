# app/utils/csv_parser.py
import pandas as pd
from io import StringIO, BytesIO
from typing import Optional
import asyncio

DEFAULT_TIME_COL = "DisplayDtTm"
DEFAULT_GLUCOSE_COL = "Glucose Value"

def _normalize_columns(df: pd.DataFrame) -> pd.DataFrame:
    # try to normalize alternate names
    cols_lower = {c.lower(): c for c in df.columns}
    if "displaydtm" not in cols_lower and "displaydtm" not in df.columns:
        # try to find any date/time column
        for c in df.columns:
            if "date" in c.lower() or "time" in c.lower():
                df = df.rename(columns={c: DEFAULT_TIME_COL})
                break
    if DEFAULT_GLUCOSE_COL not in df.columns:
        for c in df.columns:
            if "glucose" in c.lower() or "bg" in c.lower():
                df = df.rename(columns={c: DEFAULT_GLUCOSE_COL})
                break

    # parse datetime and numeric
    if DEFAULT_TIME_COL in df.columns:
        df[DEFAULT_TIME_COL] = pd.to_datetime(df[DEFAULT_TIME_COL], errors="coerce")
    if DEFAULT_GLUCOSE_COL in df.columns:
        df[DEFAULT_GLUCOSE_COL] = pd.to_numeric(df[DEFAULT_GLUCOSE_COL], errors="coerce")

    # drop rows without timestamp or glucose
    df = df.dropna(subset=[DEFAULT_TIME_COL, DEFAULT_GLUCOSE_COL])
    df = df.sort_values(by=DEFAULT_TIME_COL)
    return df

async def parse_csv_bytes(file_bytes: bytes, start: Optional[str] = None, end: Optional[str] = None):
    """
    Parse CSV (async wrapper to avoid blocking).
    Returns pandas.DataFrame
    """
    def _sync_parse():
        s = file_bytes.decode("utf-8", errors="replace")
        df = pd.read_csv(StringIO(s))
        df = _normalize_columns(df)
        if start:
            df = df[df[DEFAULT_TIME_COL] >= pd.to_datetime(start)]
        if end:
            df = df[df[DEFAULT_TIME_COL] <= pd.to_datetime(end)]
        return df

    df = await asyncio.to_thread(_sync_parse)
    return df
