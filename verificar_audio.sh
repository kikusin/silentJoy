#!/bin/sh

EXPECTED_CARD_NAME="ICUSBAUDIO7D"

echo "📻 Verificando tarjeta de sonido USB..."
CARD_FOUND=$(aplay -l | grep "$EXPECTED_CARD_NAME")

if [ -n "$CARD_FOUND" ]; then
  echo "✅ Tarjeta encontrada: $EXPECTED_CARD_NAME"
else
  echo "❌ Tarjeta $EXPECTED_CARD_NAME no encontrada."
  echo "   Asegúrate de que esté conectada y funcionando."
  exit 1
fi

echo "🔊 Verificando configuración de ALSA (default)..."
DEFAULT_CARD_LINE=$(aplay -D default -f cd -c 2 -r 44100 -v /dev/zero 2>&1 | grep "Hardware PCM")

if echo "$DEFAULT_CARD_LINE" | grep -q "$EXPECTED_CARD_NAME"; then
  echo "✅ La tarjeta por defecto es la esperada: $EXPECTED_CARD_NAME"
else
  echo "⚠️ La tarjeta por defecto NO es $EXPECTED_CARD_NAME"
  echo "   Revisa /etc/asound.conf o ~/.asoundrc"
  echo "   Línea actual: $DEFAULT_CARD_LINE"
  exit 2
fi

echo "🎚️ Verificando niveles ALSA..."
alsactl init "$EXPECTED_CARD_NAME"

echo "✅ Todo parece estar correcto."
