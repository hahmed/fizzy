// Action Cable over HTTP/3.
//
// Browsers never expose WebSockets-over-HTTP/3 to JavaScript, so a cable that rides QUIC has to use
// WebTransport. Turbo bundles its own copy of Action Cable, and each copy has a private adapters
// object, so the consumer Turbo uses has to be built from the copy we patched.
//
// Left alone unless bin/dev --http3 advertised an HTTP/3 listener, and unless the browser has
// WebTransport at all: everywhere else Turbo keeps its WebSocket consumer.

import * as ActionCable from "@rails/actioncable"
import { cable } from "@hotwired/turbo-rails"
import { installWebTransportCable } from "quicsilver/action_cable"

if (document.querySelector('meta[name="quicsilver-webtransport-certificate-sha256"]')) {
  if (installWebTransportCable({ ActionCable })) {
    cable.setConsumer(ActionCable.createConsumer())
  }
}
