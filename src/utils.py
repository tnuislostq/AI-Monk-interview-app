from datetime import datetime


def format_timestamp(value: str) -> str:
    try:
        dt = datetime.fromisoformat(value.replace('Z', '+00:00'))
        return dt.strftime('%d %b %Y, %I:%M %p')
    except ValueError:
        return value


def trim_message(text: str, limit: int = 500) -> str:
    text = text.strip()
    return text if len(text) <= limit else text[:limit] + '...'
