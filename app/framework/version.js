// version.json is written by the build workflow next to kursausschreibung.zip
// on GitHub Pages (no GitHub API, it is limited to 60 calls per hour)
export const LATEST_VERSION_URL =
  'https://bkd-mba-fbi.github.io/kursausschreibung/version.json';

/**
 * removes the build metadata of a version, e.g. "3.7.0+484e4d82" => "3.7.0"
 * @param {string} version
 */
export function cleanVersion(version) {
  if (typeof version !== 'string') {
    return null;
  }
  return version.split('+')[0].replace(/^v/, '') || null;
}

/**
 * returns true if version a is higher than version b (major.minor.patch)
 * @param {string} a
 * @param {string} b
 */
export function isNewerVersion(a, b) {
  let pa = parseVersion(a);
  let pb = parseVersion(b);

  if (pa === null || pb === null) {
    return false;
  }

  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) {
      return pa[i] > pb[i];
    }
  }
  return false;
}

function parseVersion(version) {
  let match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(cleanVersion(version) || '');
  return match ? match.slice(1, 4).map(Number) : null;
}

/**
 * loads the latest released version ({ version, url })
 * returns null if version.json can not be loaded
 */
export function loadLatestVersion(url = LATEST_VERSION_URL) {
  return fetch(url, { cache: 'no-cache' })
    .then((response) => (response.ok ? response.json() : null))
    .then((data) =>
      data && typeof data.version === 'string'
        ? { version: cleanVersion(data.version), url: data.url }
        : null
    )
    .catch(() => null);
}
