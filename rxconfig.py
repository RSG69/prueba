import os
import reflex as rx

config = rx.Config(
    app_name="prueba",
    host="0.0.0.0",
    port=int(os.getenv("PORT", 8000)),
)