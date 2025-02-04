export const MATRIX_JSON = {
  'm.server': 'matrix.noman.land:443',
};

export const MASTODON_XML = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">',
  '<Link rel="lrdd" type="application/xrd+xml" template="https://mastodon.noman.land/.well-known/webfinger?resource={uri}"/>',
  '</XRD>',
].join('');
