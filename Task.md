# Mushroom

## Pasiruosimas

Sukurti duombaze pavadinimu "mushroom".

Duombazeje reikalinga lentele "mushroom", kurios struktura:

- id (skaicius, desimtzenklis sveikasis)
- mushroom (tekstas, 20 simboliu) - grybo pavadinimas
- weight (skaicius, keturzenklis sveikasis) - grybo mase gramais
- price (skaicius, dvizenkle sveikoji dalis ir dvizenkle desimtaine dalis) - eur/kg
- rating (skaicius, vienazenklis sveikasis)

Lentele uzpildyti tokia informacija (eiliskumas atitinka struktura):

- baravykas; 500; 20; 5;
- raudonikis; 200; 10; 5;
- voveraite; 100; 7; 3;
- umede; 150; 8; 4;
- kazlekas; 250; 10; 3;

Duombazeje reikalinga lentele "gatherer", kurios struktura:

- id (skaicius, desimtzenklis sveikasis)
- name (tekstas, 20 simboliu) - grybautojo vardas

Lentele uzpildyti tokia informacija (eiliskumas atitinka struktura):

- Jonas;
- Maryte;
- One;
- Juozas;

Duombazeje reikalinga lentele "basket", kurios struktura:

- id (skaicius, desimtzenklis sveikasis)
- gatherer_id (skaicius, desimtzenklis sveikasis)
- mushroom_id (skaicius, desimtzenklis sveikasis)
- count (skaicius, trizenklis sveikasis)

Lentele uzpildyti tokia informacija (eiliskumas atitinka struktura):

- 1; 1; 1;
- 1; 2; 3;
- 3; 4; 5;
- 4; 5; 2;
- 4; 5; 2;
- 2; 3; 10;
- 3; 5; 8;
- 2; 1; 2;

Duombazeje reikalinga lentele "ratings", kurios struktura:

- id (skaicius, desimtzenklis sveikasis)
- name_lt (tekstas, 20 simboliu) - lietuviskas vertimas
- name_en (tekstas, 20 simboliu) - angliskas vertimas

Lentele uzpildyti tokia informacija (eiliskumas atitinka struktura):

- 1; labai prastai; very bad;
- 2; prastai; bad;
- 3; normaliai; ok;
- 4; gerai; good;
- 5; labai gerai; perfect;

## Uzduotys

**1.** _Isspausdinti, visu grybu pavadinimus ir ju kainas, grybus isrikiuojant nuo brangiausio link pigiausio_

pvz.:

```
Grybai:
1) Pavadinimas - 10.00 EUR/kg
2) Pavadinimas - 8.00 EUR/kg
3) Pavadinimas - 5.00 EUR/kg
```

**2.** _Isspausdinti, visu grybautoju vardus_

pvz.: Grybautojai: Vardenis, Vardenis, Vardenis.

**3.** _Isspausdinti, brangiausio grybo pavadinima_

pvz.: Brangiausias grybas yra: Pavadinimas.

**4.** _Isspausdinti, pigiausio grybo pavadinima_

pvz.: Pigiausias grybas yra: Pavadinimas.

**5.** _Isspausdinti, visu kiek vidutiniskai reikia grybu, jog jie svertu 1 kilograma (suapvalinti iki vieno skaiciaus po kablelio), isrikiuojant pagal pavadinima nuo abeceles pradzios link pabaigos_

pvz.:

```
Grybai:
1) Pavadinimas - 2
2) Pavadinimas - 5
3) Pavadinimas - 7.3
```

**6.** _Isspausdinti, visu grybautoju krepselyje esanciu grybu kiekius (issirikiuojant pagal grybautojo varda nuo abeceles pradzios link pabaigos)_

pvz.:

```
Grybu kiekis pas grybautoja:
1) Vardenis - 10 grybu
2) Vardenis - 5 grybu
3) Vardenis - 7 grybu
```

**7.** _Isspausdinti, visu grybautoju krepseliu kainas (issirikiuojant nuo brangiausio link pigiausio krepselio), suapvalinant iki centu_

pvz.:

```
Grybu krepselio kainos pas grybautoja:
1) Vardenis - 20 EUR
2) Vardenis - 15.75 EUR
3) Vardenis - 7 EUR
```

**8** _Isspausdinti, kiek nuo geriausiai vertinamu iki blogiausiai vertinamu grybu yra surinkta. Spausdinima turi atlikti funkcija (pavadinimu `mushroomsByRating()`), kuri gauna vieninteli parametra - kalbos pavadinima, pagal kuria reikia sugeneruoti rezultata_

lt pvz.:

```
Grybu kiekis pagal ivertinima:
5 zvaigzdutes (labai gerai) - 5 grybai
4 zvaigzdutes (gerai) - 7 grybai
3 zvaigzdutes (normaliai) - 13 grybai
```

en pvz.:

```
Mushrooms count by rating:
5 stars (perfect) - 5 mushrooms
4 stars (good) - 7 mushrooms
3 stars (ok) - 13 mushrooms
```

**9** _Isspausdinti, visus grybus, kuriu ivertinimas geresnis arba lygus 4 zvaigzdutem, isrikiuotus gerejimo tvarka_

pvz.: Grybai: Grybas, Grybas, Grybas.

**10** _Isspausdinti, visus grybus, kuriu ivertinimas yra viena is nurodytu reiksmiu: 1, 3 arba 5 zvaigzdutem, isrikiuotus gerejimo tvarka_

pvz.: Grybai: Grybas, Grybas, Grybas.
