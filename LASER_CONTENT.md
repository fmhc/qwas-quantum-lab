# LaserCube 2W - TTC Hamburg Sicherheitskonzept
## Gebäudeprojektion vom Fenster aus

**Erstellt:** 07.01.2025  
**Gerät:** LaserCube 2W (X-Laser)  
**Standort:** TTC Hamburg, Große Bahnstraße 101  
**Laserschutzbeauftragter:** Finn Malte Hinrichsen

---

## 1. GERÄTESPEZIFIKATION LaserCube 2W

### 1.1 Technische Daten (vom Hersteller)

**Allgemein:**
- Modell: LaserCube 2W
- Hersteller: X-Laser
- Gewicht: 1,7 kg
- Maße: 10 × 10 × 11 cm
- Batterie: 14.000 mAh (2-3h Laufzeit)

**Laser-Spezifikationen:**
- **Gesamtleistung: 2.000 mW (2W)**
- **Laserklasse: 4** ⚠️ (höchste Gefährdungsstufe!)
- Strahldurchmesser: 4 mm
- Divergenz: 1 mRad
- Scanner: >30.000 pps bei 8° Scanwinkel

**RGB-Dioden:**
| Farbe | Wellenlänge | Leistung |
|-------|-------------|----------|
| 🔵 Blau | 450 nm | 1.200 mW |
| 🟢 Grün | 520 nm | 400 mW |
| 🔴 Rot | 638 nm | 400 mW |

**Sicherheitsfeatures:**
- ✅ Schlüsselschalter (Key Switch)
- ✅ Interlock-Anschluss
- ✅ Strahlblocker (Shutter)
- ✅ LED-Statusanzeige
- ✅ CE / RoHS / IEC 60825-1 zertifiziert

**Software:**
- LaserOS (kostenlos)
- WiFi/Ethernet Steuerung
- PC, Mac, Android, iOS kompatibel

---

## 2. GEFÄHRDUNGSBEURTEILUNG FÜR KLASSE 4 LASER

### ⚠️ **KLASSE 4 = HÖCHSTE GEFÄHRDUNGSSTUFE**

**Definition (DIN EN 60825-1):**
> Laser der Klasse 4 sind gefährlich für Augen und Haut durch **direkte** und **diffus reflektierte** Strahlung. Sie können auch Brand- und Explosionsgefahr darstellen.

### 2.1 Gefährdungen im Detail

#### A) 🔴 **AUGEN (KRITISCH!)**
**Direkte Bestrahlung:**
- Sofortige, permanente Netzhautschädigung bei < 1ms Exposition
- Grün (520nm) besonders gefährlich (hohe Augensensibilität)
- Blau (450nm) zusätzlich Hornhautschäden möglich

**Diffuse Reflexion:**
- Auch reflektiertes Licht von matter Wand kann gefährlich sein!
- Sicherheitsabstand zu diffuser Reflexion: ca. 1-3m

**NOHD (Nominal Ocular Hazard Distance):**
- Bei 2W kollimiertem Strahl: **ca. 200-300m**
- Mit Scanwinkel (8°): reduziert auf ca. 50-100m
- Bei Projektion auf Wand: Sicherheitszone 5m Radius

#### B) 🔥 **HAUT**
- Bei direkter Bestrahlung: Verbrennungen möglich
- Besonders bei stationärem Strahl (nicht-scannernd)
- Risiko: NIEDRIG bei bewegten Bildern (Scanner verteilt Energie)

#### C) 🔥 **BRANDGEFAHR**
- 2W können brennbare Materialien entzünden
- Risiko bei: Papier, Textilien, dunklen Oberflächen
- Projektionsfläche: Beton/Putz = OK

#### D) 💥 **REFLEXIONEN**
**Spiegelnde Reflexionen (HÖCHSTE GEFAHR):**
- Fenster: 4-8% Reflexion = **80-160mW zurück!**
- Metallteile, Spiegel: bis zu 90% Reflexion
- **→ NIEMALS durch geschlossenes Fenster lasern!**

**Diffuse Reflexionen:**
- Matte Wände: 10-40% Reflexion verteilt
- Sicherheitsabstand: 3-5m zur Projektionswand

#### E) 👁️ **BLENDUNG**
- Temporäre Sehbeeinträchtigung bei indirekter Sicht
- Gefahr für: Autofahrer, Lokführer, Passanten
- Nachwirkzeit: 5-30 Sekunden

---

## 3. EUER SPEZIFISCHES SETUP

### 3.1 Standort-Analyse (basierend auf Fotos)

**Laser-Position:**
- 📍 Rechtes Gebäude (Wellblech-Gebäude mit "X"-Markierung)
- 🪟 Am Fenster, innen
- 📏 20cm hohes Stativ
- 🧭 Blickrichtung: Nach WESTEN (zum Backsteingebäude)

**Projektionsziele (laut Markierung):**
1. **Magenta-Fläche 1:** Backsteingebäude links (schräge Wand)
2. **Magenta-Fläche 2:** "date up" Schriftzug-Bereich (Mitte)

**Umgebung:**
- 🚂 S-Bahn Gleise: ca. 50m südlich
- 🚗 Große Bahnstraße: direkt vor Gebäude
- 🅿️ Parkplatz: zwischen Gebäuden
- 🏢 Gewerbegebiet, nach Feierabend wenig Publikum

### 3.2 Geometrie & Abstände

```
DRAUFSICHT (vereinfacht):

          NORDEN
             ↑
    [Backsteingebäude]  ← Projektionsziel 1
            💜
           /
          /  
    [🔴 LASER]----------→ [date up]  ← Projektionsziel 2
     (Wellblech)              💜
         |
         |
    [Parkplatz]
         |
         ↓
   Große Bahnstraße
         |
         ↓
    S-Bahn Gleise (50m)
```

**Gemessene Distanzen (ca.):**
- Laser ↔ Backsteingebäude: ~15m
- Laser ↔ "date up" Wand: ~10m
- Laser ↔ Straße: ~5m
- Laser ↔ Bahngleise: ~50m

**Höhen:**
- Laser: 20cm Stativ + Tischhöhe? ≈ **1m über Boden**
- Projektionsfläche Mitte: ca. 2-4m Höhe (1. + 2. Stock)
- Projektionsfläche Backsteingebäude: 2-6m Höhe

---

## 4. KRITISCHE RISIKEN & PFLICHT-MAẞNAHMEN

### 🚨 **RISIKO #1: FENSTER-REFLEXION (HÖCHSTE PRIORITÄT!)**

**Problem:**
- Laser durch Fenster = 4-8% Reflexion zurück in Raum
- Bei 2W = **80-160mW reflektiert** (immer noch Klasse 3B!)
- Gefahr für Bediener im Raum

**LÖSUNG (NUR EINE OPTION ERLAUBT):**

✅ **Option A: FENSTER ÖFFNEN (BESTE LÖSUNG)**
- Fenster komplett öffnen, Laser zeigt direkt raus
- Kein Glas im Strahlengang
- Nachteil: Kälte im Winter, Wetter-Abhängigkeit

✅ **Option B: FENSTER AUSBAUEN**
- Fensterflügel temporär ausbauen während Projektion
- Öffnung mit Plane abdecken (schwarz, nicht reflektierend)

❌ **VERBOTEN: Durch geschlossenes Fenster lasern!**

---

### 🚨 **RISIKO #2: BAHNVERKEHR (STRAFTAT!)**

**Problem:**
- S-Bahn Gleise in 50m Entfernung (südlich)
- Blendung von Lokführern = §315 StGB (bis 10 Jahre Haft!)
- Auch indirekte Blendung durch Reflexionen

**LÖSUNG:**

✅ **Strahlwinkel-Begrenzung:**
```
ERLAUBT:
- Projektion nach NORDEN (Backsteingebäude)
- Projektion nach WESTEN (date up)
- Max. Horizontalwinkel: 270° - 360° (Nord bis West)

VERBOTEN:
- NIEMALS nach SÜDEN (Richtung Gleise)!
- NIEMALS nach OSTEN (offenes Gelände)
- In LaserOS: "Beam-Restricted-Zone" für 90°-180° setzen
```

✅ **Software-Sicherheitszone:**
- LaserOS → Safety Settings → Restricted Zones
- Zone definieren: Azimut 90°-180° = TABU 
- Laser schaltet automatisch ab bei Richtung Gleise

✅ **Höhenbegrenzung:**
- Max. 20° nach oben (bleibt unter Gebäudehöhe)
- NIEMALS horizontal oder nach oben in den Himmel!

---

### 🚨 **RISIKO #3: STRAẞE (Autofahrer)**

**Problem:**
- Große Bahnstraße direkt vor Gebäude
- Autofahrer könnten durch Reflexionen geblendet werden

**LÖSUNG:**

✅ **Projektionsflächen-Auswahl:**
- NUR Wände die VON der Straße ABGEWANDT sind
- Backsteingebäude: OK (zeigt nach Norden, weg von Straße)
- "date up" Wand: PRÜFEN! (könnte zur Straße reflektieren)

✅ **Dämmerungstest (PFLICHT vor erster Nutzung):**
1. Aufbau bei Tageslicht
2. Test bei Dämmerung mit 10% Leistung
3. Kollege steht an Straße: "Siehst du was?"
4. Wenn JA → Winkel ändern oder diese Fläche streichen

✅ **Helligkeitsreduktion:**
- LaserOS: Master Brightness auf 30-50% (reicht für Sichtbarkeit)
- Volle 2W nur bei absoluter Dunkelheit

---

### 🚨 **RISIKO #4: PARKPLATZ (Personen)**

**Problem:**
- Parkplatz zwischen Gebäuden
- Personen könnten durchlaufen

**LÖSUNG:**

✅ **Zeitliche Beschränkung:**
- NUR nach Betriebsschluss (wann ist das bei euch? 18 Uhr?)
- NUR wenn Parkplatz leer/gesperrt

✅ **Physische Absperrung (PFLICHT!):**
- Absperrband am Parkplatz-Eingang
- Warnschilder: "ACHTUNG LASERZONE - NICHT BETRETEN"
- Mind. 2 Schilder (Eingang + gegenüberliegende Seite)

✅ **Sicherheitsposten:**
- Zweite Person beobachtet Parkplatz
- Bei Person im Gefahrenbereich → SOFORT NOT-AUS

---

## 5. TECHNISCHE SCHUTZMAẞNAHMEN

### 5.1 Aufbau-Checkliste

```
SCHRITT 1: VORBEREITUNG (10 Min)
□ Fenster öffnen (oder Flügel ausbauen)
□ Stativ aufbauen (stabil! wackelt nicht!)
□ LaserCube platzieren (20cm Stativ am Fenster)
□ Stromversorgung anschließen (oder Akku geladen?)
□ Schlüssel einstecken, aber NOCH NICHT drehen

SCHRITT 2: ABSPERRUNG (5 Min)
□ Parkplatz mit Absperrband sperren
□ 2× Warnschilder aufstellen:
   - "ACHTUNG LASERZONE KLASSE 4"
   - "KEIN ZUTRITT - AUGENGEFAHR"
□ Sicherheitsposten positioniert

SCHRITT 3: SOFTWARE-SETUP (5 Min)
□ LaserOS öffnen
□ Safety Settings → Enable Restricted Zones
□ Zone 1: Azimut 90°-180° (Süden/Gleise) = VERBOTEN
□ Zone 2: Elevation > 20° = VERBOTEN
□ Master Brightness: 30% (für ersten Test)

SCHRITT 4: TEST (10 Min)
□ Schlüssel drehen → LaserCube AN
□ Test-Muster projizieren (einfaches Raster)
□ Sicherheitsposten prüft:
   - Reflexionen zur Straße? (JA → abbrechen!)
   - Personen im Parkplatz? (JA → warten!)
   - Sichtbar von Bahngleisen? (JA → Winkel ändern!)
□ Wenn alles OK → Brightness auf 50-70% erhöhen

SCHRITT 5: BETRIEB (max. 2h)
□ Eigentliche Projektion starten
□ Permanente Beobachtung durch LSB
□ Sicherheitsposten bleibt auf Position
□ NOT-AUS griffbereit (Schlüssel oder Shutter-Button)

SCHRITT 6: ABBAU (5 Min)
□ LaserCube ausschalten (Schlüssel drehen)
□ 5 Min warten (Gerät abkühlen lassen)
□ Absperrung entfernen
□ Fenster schließen
□ Dokumentation ausfüllen (Betriebsbuch)
```

### 5.2 NOT-AUS System

**3 Möglichkeiten:**

1. **Schlüssel herausziehen** (sicherste Methode)
   - Schlüssel am Gerät immer griffbereit
   - Bei Gefahr: Rausziehen → Laser AUS

2. **Shutter Button** (schnellste Methode)
   - LaserCube hat eingebauten Shutter
   - Knopf drücken → Strahl blockiert (Laser läuft weiter)

3. **LaserOS Emergency Stop**
   - Rote STOP-Taste in Software
   - Funktioniert über WiFi (kann verzögert sein!)

**Wer darf NOT-AUS drücken?**
- ✅ Laserschutzbeauftragter (Finn)
- ✅ Bediener
- ✅ Sicherheitsposten
- ✅ JEDE Person die eine Gefahr sieht!

---

## 6. ORGANISATORISCHE MAẞNAHMEN

### 6.1 Rollen & Verantwortung

**Rolle 1: Laserschutzbeauftragter (LSB)**
- Person: Finn Malte Hinrichsen
- Aufgaben:
  - Freigabe jeder Projektion (Unterschrift!)
  - Überwachung während Betrieb
  - Notfall-Entscheidungen
  - BG-Kontakt bei Unfällen
- Anwesend: IMMER während Laserbetrieb

**Rolle 2: Bediener**
- Person: [Zu benennen, muss geschult sein!]
- Aufgaben:
  - LaserOS bedienen
  - Inhalte/Animationen steuern
  - NOT-AUS bei technischen Problemen
- Position: Am Laptop/Tablet, Sichtverbindung zum Laser

**Rolle 3: Sicherheitsposten**
- Person: [Zu benennen, Kurzeinweisung reicht]
- Aufgaben:
  - Beobachtet Parkplatz/Straße
  - Warnt bei Personen im Gefahrenbereich
  - NOT-AUS bei Personengefahr
- Position: Im Freien, Überblick über Projektionsbereich

**Mindestbesetzung: 2 Personen (LSB + Sicherheitsposten)**
- Besser: 3 Personen (LSB + Bediener + Sicherheitsposten)

### 6.2 Unterweisung

**Vor ERSTER Nutzung (jede Person):**

**Schulung Laserschutzbeauftragter (Finn):**
- ✅ Bereits vorhanden (Ausweis liegt vor)
- Auffrischung: Jährlich

**Schulung Bediener (30 Min):**
- Gefahren von Klasse 4 Lasern
- Augen-Gefahren (NIE in Strahl schauen!)
- Bedienung LaserCube (Schlüssel, Shutter, Software)
- Restricted Zones in LaserOS
- NOT-AUS Verfahren
- Notfallverhalten (Erste Hilfe bei Augenkontakt)
- Unterschrift auf Unterweisungsnachweis

**Einweisung Sicherheitsposten (10 Min):**
- Was beobachten? (Personen, Fahrzeuge)
- Wann NOT-AUS? (Person im Parkplatz, Auto hält an)
- Wie NOT-AUS? (Finn anrufen: "STOP!", oder selbst Schlüssel ziehen)

**Dokumentation:**
```
UNTERWEISUNGSNACHWEIS

Datum: _________
Name: _________________________
Rolle: [ ] Bediener [ ] Sicherheitsposten

Inhalte:
□ Gefahren Klasse 4 Laser erklärt
□ NOT-AUS Verfahren geübt
□ Notfallverhalten besprochen
□ Fragen beantwortet

Unterschrift LSB: _____________
Unterschrift Teilnehmer: _____________
```

### 6.3 Betriebszeiten

**Erlaubt:**
- Montag - Donnerstag: 19:00 - 22:00 Uhr
- Freitag: 19:00 - 21:00 Uhr (früher wegen Wochenende-Verkehr)
- Samstag: NEIN (zu viel Publikumsverkehr)
- Sonntag: NEIN

**Dauer:**
- Max. 2h pro Abend
- Pause alle 30min (Gerät abkühlen, Umgebung prüfen)

**Wetter:**
- ✅ Trocken, windstill
- ❌ Regen (Fenster offen = Wasser kommt rein)
- ❌ Starker Wind (>20 km/h = Stativ wackelt)
- ❌ Nebel (Strahl wird sichtbar in Luft = Blendgefahr)

---

## 7. NOTFALLKONZEPT

### 7.1 Notfall: Person im Laserstrahl

**Anzeichen:**
- Person schreit auf
- Person hält sich Augen zu
- Person taumelt/desorientiert

**SOFORT-MAẞNAHMEN:**
1. ⚡ **NOT-AUS! Schlüssel rausziehen!**
2. ⚡ Person ansprechen: "Haben Sie in den Laser geschaut?"
3. ⚡ Person aus Gefahrenbereich führen

**Bei Augenkontakt:**
```
ERSTE HILFE:
1. ❌ NICHT Augen reiben!
2. ✅ Augen offen lassen (nicht zukneifen)
3. ✅ Mit klarem Wasser spülen (5 Min)
4. ✅ Notruf 112: "Laserstrahlung ins Auge, Klasse 4, 2 Watt"
5. ✅ Info für Rettungsdienst:
   - Wellenlängen: 450nm Blau, 520nm Grün, 638nm Rot
   - Leistung: 2W (2.000mW)
   - Dauer: [so kurz wie möglich angeben]
6. ✅ Transport Augenklinik (nicht selbst fahren!)
```

**Augenkliniken Hamburg (Notfall 24/7):**
- Universitätsklinikum Eppendorf (UKE): 040 / 7410-0
- Asklepios Klinik Barmbek: 040 / 181 82-0

**Nach Vorfall:**
- ✅ Projektion BEENDEN (nicht weitermachen!)
- ✅ BG-Unfallmeldung: 0800 9990080-0 (BGHM)
- ✅ Vorfall dokumentieren (Betriebsbuch)
- ✅ Gefährdungsbeurteilung überprüfen

### 7.2 Notfall: Brand

**Ursachen:**
- Laser auf brennbarem Material (Papier, Textilien)
- Stationärer Strahl (nicht-scannend) auf dunkler Fläche

**MAẞNAHMEN:**
1. ⚡ LaserCube ausschalten
2. ⚡ Feuerlöscher (6kg Pulver) bereithalten
3. ⚡ Bei kleinem Brand: selbst löschen
4. ⚡ Bei Brandausbreitung: 112 + Gebäude evakuieren

**Vorbeugung:**
- ✅ LaserOS: "Motion Disable" aktivieren (Laser stoppt wenn Scanner blockiert)
- ✅ Keine brennbaren Materialien in Strahlengang
- ✅ Feuerlöscher in Raum (Pflicht!)

### 7.3 Notfall: Technischer Defekt

**Symptome:**
- Scanner arbeitet nicht (Strahl steht still)
- Laser überhitzt (Temperaturwarnung in LaserOS)
- Ungewollte Bewegungen

**MAẞNAHMEN:**
1. ⚡ Sofort ausschalten (Schlüssel ziehen)
2. ⚡ Gerät abkühlen lassen (30 Min)
3. ⚡ NICHT wieder einschalten
4. ⚡ Erst Prüfung durch Sachkundigen

---

## 8. RECHTLICHE ANFORDERUNGEN

### 8.1 Anzeigepflicht bei BG (PFLICHT!)

**Wer:** Berufsgenossenschaft Holz und Metall (BGHM)

**Wann:** VOR erster Inbetriebnahme (mind. 2 Wochen Vorlauf)

**Wie:**
- Online: [www.bghm.de](https://www.bghm.de) → Mein Konto → Anzeige Lasereinrichtung
- Oder: Formular ausfüllen + per Post

**Inhalt:**
```
ANZEIGE LASEREINRICHTUNG

Betrieb: Erfolgswind GmbH & Co. KG / TTC Hamburg
Standort: Große Bahnstraße 101, 22297 Hamburg

Gerät: LaserCube 2W (X-Laser)
Laserklasse: 4
Wellenlängen: 450nm (1,2W), 520nm (0,4W), 638nm (0,4W)
Gesamtleistung: 2.000 mW (2W)

Verwendungszweck: Marketing-Projektion auf Gebäudefassaden
Betriebsart: Intermittierend (ca. 2h/Abend, 2-3× pro Woche)

Laserschutzbeauftragter: Finn Malte Hinrichsen
Qualifikation: [Kursnummer/Datum des LSB-Kurses]

Schutzmaßnahmen: siehe beigefügte Gefährdungsbeurteilung

Unterschrift: ___________________
Datum: ___________
```

**Beilegen:**
- Gefährdungsbeurteilung (dieses Dokument!)
- LSB-Ausweis (Kopie)
- LaserCube Datenblatt

### 8.2 Keine weiteren Genehmigungen nötig

✅ **NICHT erforderlich (da privates Gelände):**
- Ordnungsamt Hamburg (nur bei öffentlichen Veranstaltungen)
- Gewerbeaufsicht (nur bei Dauerbetrieb)
- Luftfahrtbehörde (nur bei Projektion > 50m Höhe)

✅ **Vermieter-Genehmigung:**
- Herr de Vries (Metallerinnung Hamburg) hat zugestimmt ✅

### 8.3 Dokumentationspflichten

**1. Betriebsbuch (PFLICHT):**

```
LASERCUBE 2W - BETRIEBSBUCH TTC HAMBURG

Datum      | Start | Ende  | Projekt      | LSB    | Bediener | Sipo   | Bemerkungen
-----------|-------|-------|--------------|--------|----------|--------|------------------
07.01.2025 | 19:30 | 21:00 | Test         | FMH ✓  | FMH      | -      | Erstinbetriebnahme, nur 30% Power
08.01.2025 | 19:00 | 20:30 | Marketing #1 | FMH ✓  | [Name]   | [Name] | Backsteingebäude, kein Vorfall
```

**Spalten-Erklärung:**
- LSB ✓ = Freigabe durch Laserschutzbeauftragten
- Sipo = Sicherheitsposten
- Bemerkungen = Vorkommnisse, Wetter, Besonderheiten

**2. Unterweisungsnachweise:**
- Liste aller geschulten Personen
- Datum, Inhalt, Unterschrift
- Aufbewahrung: 5 Jahre

**3. Prüfprotokoll (jährlich):**
- Überprüfung durch Sachkundigen
- Optik, Elektronik, Sicherheitseinrichtungen
- Nächste Prüfung: [Datum in 12 Monaten]

---

## 9. PRAKTISCHE CHECKLISTE (Kurzform)

### VOR JEDER PROJEKTION:

**15 Minuten vorher:**
```
□ Wetter OK? (trocken, wenig Wind)
□ Fenster geöffnet
□ Stativ aufgebaut (stabil!)
□ LaserCube platziert (Kabel gesichert!)
□ Absperrband Parkplatz
□ 2× Warnschilder aufgestellt
□ Sicherheitsposten eingewiesen
□ LaserOS: Restricted Zones aktiviert
□ LaserOS: Brightness 30%
□ Feuerlöscher griffbereit
```

**Freigabe durch LSB:**
```
□ Alle Punkte erfüllt?
□ Team vollständig? (mind. 2 Personen)
□ NOT-AUS besprochen?
□ Notfallnummern bekannt?

→ Unterschrift LSB im Betriebsbuch: ___________
```

**START:**
```
□ Schlüssel drehen → LaserCube AN
□ Test-Projektion (10 Sek, 30% Power)
□ Sicherheitsposten: "Alles frei?"
□ Wenn JA → Brightness erhöhen
□ Wenn NEIN → Warten oder abbrechen
```

**WÄHREND BETRIEB (alle 15 Min prüfen):**
```
□ Laser läuft stabil?
□ Temperatur OK? (LaserOS Monitoring)
□ Sicherheitsposten wachsam?
□ Parkplatz frei?
□ Straße unauffällig?
□ NOT-AUS griffbereit?
```

**NACH PROJEKTION:**
```
□ LaserCube ausschalten
□ 5 Min abkühlen lassen
□ Absperrung entfernen
□ Fenster schließen
□ Betriebsbuch ausfüllen
□ Gerät verstauen (sicher, abgeschlossen)
```

---

## 10. ZUSAMMENFASSUNG: DARF ICH STARTEN?

### ✅ JA, wenn ALLE Punkte erfüllt:

1. ✅ BG-Anzeige gestellt (vor erster Nutzung)
2. ✅ Fenster OFFEN (kein Glas im Strahlengang)
3. ✅ LaserOS Restricted Zones aktiv (Gleise gesperrt)
4. ✅ Parkplatz abgesperrt + Warnschilder
5. ✅ 2 Personen anwesend (LSB + Sicherheitsposten)
6. ✅ Wetter OK (trocken, windstill, kein Nebel)
7. ✅ Betriebszeit 19-22 Uhr (Mo-Do)
8. ✅ Feuerlöscher vorhanden
9. ✅ NOT-AUS griffbereit
10. ✅ Betriebsbuch liegt bereit

### ❌ NEIN / SOFORT STOPPEN, wenn:

- ❌ Person im Parkplatz/Gefahrenbereich
- ❌ Fenster geschlossen (Reflexionsgefahr!)
- ❌ Restricted Zones deaktiviert
- ❌ Nur 1 Person (LSB MUSS anwesend sein!)
- ❌ Wetter schlecht (Regen, starker Wind, Nebel)
- ❌ Laser überhitzt (Temperaturwarnung)
- ❌ Scanner defekt (Strahl steht still)
- ❌ Reflexionen zur Straße sichtbar
- ❌ Beschwerde von Anwohnern/Polizei

---

## 11. KONTAKTE & NOTFALLNUMMERN

### Laserschutzbeauftragter
- Name: Finn Malte Hinrichsen
- Telefon: [Nummer ergänzen]
- E-Mail: [E-Mail ergänzen]

### Notfälle
- **Notruf:** 112
- **Giftnotruf Hamburg:** 040 / 19240
- **Augen-Notfall UKE:** 040 / 7410-0

### Behörden
- **BG BGHM (Unfallmeldung):** 0800 / 9990080-0
- **BG BGHM (Beratung):** 0621 / 183-0
- **Ordnungsamt Hamburg:** 040 / 42828-0 (bei Beschwerden)

### Technischer Support
- **X-Laser Support:** [support@x-laser.com](mailto:support@x-laser.com)
- **LaserOS Forum:** [forum.x-laser.com](https://forum.x-laser.com)

### Vermieter
- **Herr de Vries (Metallerinnung):** [Telefon ergänzen]

---

## 12. ANHANG

### A) Begriffe

- **LSB:** Laserschutzbeauftragter
- **NOHD:** Nominal Ocular Hazard Distance (Augengefährdungsabstand)
- **Sipo:** Sicherheitsposten
- **BG:** Berufsgenossenschaft
- **BGHM:** BG Holz und Metall
- **Klasse 4:** Höchste Laserklasse, gefährlich für Augen + Haut

### B) Gesetzliche Grundlagen

- **DGUV Vorschrift 11:** Laserstrahlung
- **DIN EN 60825-1:** Sicherheit von Lasereinrichtungen
- **TROS Laserstrahlung:** Technische Regeln (BAuA)
- **OStrV:** Arbeitsschutzverordnung optische Strahlung
- **§315 StGB:** Gefährlicher Eingriff in Bahnverkehr

### C) Weiterführende Infos

- BAuA: [www.baua.de](https://www.baua.de) → TROS Laserstrahlung
- BGHM: [www.bghm.de](https://www.bghm.de) → Lasersicherheit
- X-Laser Manual: [files.x-laser.com/Product_Manuals/Lasercube_US_Manual.pdf](https://files.x-laser.com/Product_Manuals/Lasercube_US_Manual.pdf)

---

**Dokumentenstatus:** Version 1.0 - Spezifisch für LaserCube 2W  
**Erstellt:** 07.01.2025  
**Gültig bis:** 07.01.2026 (jährliche Überprüfung!)

**Freigabe Laserschutzbeauftragter:**

____________________________  
Finn Malte Hinrichsen  
Datum: ___________

---

*Dieses Dokument ist verbindlich für alle Personen, die am Laserbetrieb beteiligt sind. Bei Unklarheiten IMMER den Laserschutzbeauftragten fragen. Im Zweifel: NICHT starten!*






