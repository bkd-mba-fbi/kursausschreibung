# Dependabot-Prozess

> _Wie halten wir die npm-Pakete aktuell, damit keine Version mehr liegen bleibt?_

**Zuständig:** @WalidBoul · **Für:** Entwicklungsteam Kursausschreibung · **Stand:** 27.11.2026 · Issue [#216](https://github.com/bkd-mba-fbi/kursausschreibung/issues/216)

## Was macht Dependabot?
Dependabot ist ein in GitHub eingebauter Roboter. Er überwacht die npm-Pakete und GitHub Actions des Moduls und öffnet Pull Requests, wenn es neue Versionen gibt.

| Funktion | Was passiert | Ziel-Branch |
|---|---|---|
| **Version Updates** | Jeden **Montag 06:00** PRs für veraltete Pakete (Datei [`.github/dependabot.yml`](../.github/dependabot.yml)) | `develop` |
| **Security Updates** | Sofort ein PR, wenn ein Paket eine bekannte Sicherheitslücke hat | `master` (GitHub-Vorgabe) |
| **Alerts** | Warnung unter [Security → Dependabot](https://github.com/bkd-mba-fbi/kursausschreibung/security/dependabot) | – |

Welche PRs kommen am Montag:
* **1 PR** mit allen kleinen Updates (Minor/Patch) aller npm-Pakete
* **1 PR pro grossem Update** (Major, z.B. Ember 7): kann Code brechen
* **1 PR** mit allen Updates der GitHub Actions

## Ablauf jeden Montag (30 min)
1. [Offene Dependabot-PRs](https://github.com/bkd-mba-fbi/kursausschreibung/pulls/app%2Fdependabot) öffnen.
2. **Minor/Patch-PR:** CI grün → mergen. CI rot → Fehler beheben oder Paket im PR ausschliessen und Issue erstellen.
3. **Major-PR:** nicht mergen. Issue erstellen („Update X auf Version Y“), im nächsten Sprint planen, PR schliessen.
4. **Actions-PR:** CI grün → mergen.
5. [Alerts](https://github.com/bkd-mba-fbi/kursausschreibung/security/dependabot) anschauen: neue kritische oder hohe Warnungen? → Fristen unten.

## Fristen bei Sicherheitswarnungen
| Schweregrad | Frist |
|---|---|
| **kritisch** (critical) | **2 Arbeitstage** |
| **hoch** (high) | **1 Woche** |
| mittel / tief | im nächsten Montags-Update |

Security-Update-PRs gehen auf `master`. Den Fix auf `develop` machen (oder dort das Paket aktualisieren) und den PR auf `master` schliessen.

## Kontrolle
* **Monatlich:** Anzahl offene kritische und hohe Warnungen. Ziel: **0**. Zahl im Sprint-Review zeigen.
* **Regelmässig `develop` → `master` releasen.** Die Warnungen zeigen den Stand von `master`. Bleibt `master` alt, bleiben auch die Warnungen.

## Wichtig
* `dependabot.yml` wirkt erst, wenn sie auf `master` ist (Dependabot liest nur den Standard-Branch).
* Nach dem Mergen eines Update-PRs lokal einmal `npm ci` ausführen.
