# Native app reference snapshots

`original-app.html` and `restyled-native-app.html` are snapshots of the native Mac app's
HTML, kept byte-for-byte as a design reference.

They live outside `public/` on purpose. Everything in `public/` is published, and this site
has no backend: the sign-in, registration and admin forms in these files would submit to
their own URL and put a typed password in the address bar, the browser history and request
logs. Open them from disk instead.
