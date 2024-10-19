# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.10.12
FROM python:${PYTHON_VERSION}-slim as base

# Prevents Python from writing pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Create a non-privileged user that the app will run under.
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Download dependencies as a separate step to take advantage of Docker's caching.
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

# Clear any existing cache
# ENV PIP_NO_CACHE_DIR=1
RUN rm -rf /root/.cache/pip

COPY . .

# Expose the port that the application listens on.
EXPOSE 9001

# Volume mount for db.sqlite3
VOLUME /app/db.sqlite3:db.sqlite3

# Switch to the non-privileged user to run the application.
USER appuser

# Run the application.
CMD ["sh", "-c", "python3 manage.py runserver 0.0.0.0:9001"]