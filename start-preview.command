#!/bin/zsh

cd "$(dirname "$0")"

NODE="/Users/guillaume/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
PORT_NUMBER=3000
PYTHON="/usr/bin/python3"

echo "Starting a clean Winspiration Studio website preview..."
echo "The preview address will always be: http://localhost:$PORT_NUMBER"
echo ""

EXISTING_PROCESS=$(lsof -ti tcp:$PORT_NUMBER)
if [ -n "$EXISTING_PROCESS" ]; then
  echo "Closing the old preview on port $PORT_NUMBER..."
  kill $EXISTING_PROCESS 2>/dev/null
  sleep 1
fi

rm -rf .next

echo ""
echo "Starting the live website preview. Keep this window open."
echo "Open http://localhost:$PORT_NUMBER"
(sleep 4 && open "http://localhost:$PORT_NUMBER") &
"$NODE" node_modules/next/dist/bin/next dev -H 127.0.0.1 -p "$PORT_NUMBER"

echo ""
echo "The preview server stopped. Leave this window open and send Codex the message above if the website did not open."
read "?Press return to close this window."
