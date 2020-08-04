const OyunDurum = {
    NORMAL: 0, // oyun durumuları burda tutulacak
    KAYBETTI: 1,
    KAZANDI: 2,
    BERABERE: 3
};
const OyunTip={
    BOT: 0,
    FRİEND:1
};
var oyuncu_skor= 0;
var cpu_skor=0;
var beraberelik_sayisi=0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));//bot için bekleme olayı beklemeden direk işlem yapınca çok kötü bir görünüme sahip oluyor 
}

class Kutucuk {
    constructor(id, faktor) {
      
        this.kutucukId = id;
        this.kutucuk = document.createElement("td"); // bunlarda tr nin içindeki td ler
        this.kutucuk.setAttribute("id", "kutucuk-" + id);// objenin id="" sini ayarlıyorum.
        this.kutucuk.setAttribute("class", "caprazBulmacaKutucuk");
        
        this.kutucuk.addEventListener("click", function () {
            // tıklandığında işlem yapıcak 
            // eğer event listener yani onClick içinde this kullanırsan dom elementine erişiriz

            if (this.innerHTML == "" && window.caprazBulmaca != null ) {
                 // Eğer bu kutucuk boş ise, X atıcaz
                
                if (window.caprazBulmaca.oyunDurumu == OyunDurum.NORMAL){
                    if (window.caprazBulmaca.tipi==OyunTip.BOT) {
                        this.innerHTML = "X";
                    }
                    else{
                        if (window.caprazBulmaca.turn%2==0) {this.innerHTML = "X"; window.caprazBulmaca.turn=1;
                    window.caprazBulmaca.oyunKontrol()
                    }
                        else{this.innerHTML = "O";window.caprazBulmaca.turn=0;   window.caprazBulmaca.oyunKontrol()}
                        return;
                     
                    }
                    window.caprazBulmaca.tur++;
                }
                else
                    return;

                if (!window.caprazBulmaca.oyunKontrol()) {
                 
                    setTimeout("window.caprazBulmaca.cpuOyna()",350);
                } 
                else {
                    console.log("Oyun Bitti!");
                }
            }
        });
    }

    domElementCek() {
        return this.kutucuk;
    }
}

class Kolon { // şimdi,
    // mantıken verdiğimiz faktör sayısı ile
    // yan yana ve alt alta aynı sayıda kutucuk açmalı
    // ilk önce kolonları ayarlıyorum
    // snora kutucukları
    // bunlar iç içe objeler olacak
    constructor(id, faktor) {
        this.kolon = document.createElement("tr");
        this.kolon.setAttribute("id", "kolon-" + id);
        this.faktor = faktor;
        this.kutucukListesi = [];
    }

    domElementCek() {
        return this.kolon; // bunun html deki objesini çekiyoruz.
        // class objeleri ile html deki dom element objeleri farklıdır, yani orjinallerini tutmamız gerek
    }

    kutucukEkle(kutucuk) {
        this.kolon.appendChild(kutucuk.domElementCek());
        this.kutucukListesi.push(kutucuk);// kolonumuzun içine kutucuk ekliyoruz.
    }
}

class CaprazBulmaca {
    // İlk olarak cpu iptal edilmeli
    // OyuncuSirasi adlı değişken eklenmeli, her tıklandığında değişken tersine çevirilmeli
    // Click fonksiyonunda OyuncuSirasi kontrol edilmeli, eğer 0 ise X 1 ise O atmalı

    constructor(bulmacaId, bulmacaFaktor,bulmacaTip) {
        this.bulmaca = document.getElementById(bulmacaId);
        this.bulmacaFaktor = bulmacaFaktor; // bu değişken 3x3 mü 5x5 mi olacak ona karar verecek, buna göre kutu ekleteceğiz.
        this.kolonListesi = []; // tr lerimizin tutulacağı değişken
        this.oyunDurumu = OyunDurum.NORMAL;
        if (bulmacaTip=="Bot") {this.tipi = OyunTip.BOT;}
     else{this.tipi = OyunTip.FRİEND;}
        this.kazanmaDurumlari = []; // kombinasyon uygulayacağız burda, ama nası yapıcaz bilmiyorum 
        this.tur = 0;
        this.turn=0;
       
        // 5x5 de tüm kazanma durumlarını yazmamız gerek
        // veya 3x3 de
    }

   

    bulmacaAyarla() {//ilk başlatılan alan
        this.elementContainer = this.bulmaca.children[0]; // ilk elementimiz tbody olacak
        for (var i = 0; i < this.bulmacaFaktor; i++) { // kaça kaç olacağı ile ilgili verimizi aldık, 3x3 istemiştim
            var tr = new Kolon(i, this.bulmacaFaktor);// yani 3 kere döndürücem bu foru ve html e 3 kere td ekleticem
            for (var p = 0; p < this.bulmacaFaktor; p++) {
                var td = new Kutucuk(i * this.bulmacaFaktor + p);
                tr.kutucukEkle(td);
            }
            this.kolonListesi.push(tr);
            this.elementContainer.appendChild(tr.domElementCek());
        }
        this.kazanmaDurumlariAyarla();
        // tbody nin içine tr ekliycez, 3 tane 
    }
    kazanmaDurumlariAyarla() {
        if (this.bulmacaFaktor <= 2) // 2 den küçük olamaz 
            return; // ? 

        this.kazanmaDurumlari = [[0,1,2],
                                [3,4,5],
                                [6,7,8],
                                [0,3,6],
                                [1,4,7],
                                [2,5,8],
                                [0,4,8],
                                [2,4,6]];
        /*for (var i = 0; i < this.bulmacaFaktor; i++) {
         
            for (var j = 0; j < this.bulmacaFaktor; j++) {

            }
        }*/
    }
    oyunKontrol() { // false dönerse oyun bitmemiş.
        var oyuncuDogruKombinasyon = 0;
        var cpuDogruKombinasyon = 0;
      
        var oyunBittiMi = this.tur == (this.bulmacaFaktor * this.bulmacaFaktor);
        for (var i = 0; i < this.kazanmaDurumlari.length; i++) {
            if (oyuncuDogruKombinasyon == this.bulmacaFaktor || cpuDogruKombinasyon == this.bulmacaFaktor)
                break;

            oyuncuDogruKombinasyon = 0;
            cpuDogruKombinasyon = 0;
            var kombinasyon = this.kazanmaDurumlari[i];
            for (var j = 0; j < kombinasyon.length; j++) {
                var kutucukDOM = document.getElementById("kutucuk-" + kombinasyon[j]);
                if (kutucukDOM == null)
                    break;

                if (kutucukDOM.innerHTML == "X") { // eğer x ise
                    if (cpuDogruKombinasyon > 0) // ve o kolonda O varsa
                        break; // bu kombinasyonu boşver

                    oyuncuDogruKombinasyon++;
                } else if (kutucukDOM.innerHTML == "O") {
                    if (oyuncuDogruKombinasyon > 0)
                        break;

                    cpuDogruKombinasyon++;
                }
            }
        }
    
        if (cpuDogruKombinasyon == this.bulmacaFaktor)
            this.oyunDurumu = OyunDurum.KAYBETTI;
        if (oyuncuDogruKombinasyon == this.bulmacaFaktor)
            this.oyunDurumu = OyunDurum.KAZANDI;
        if (oyuncuDogruKombinasyon < this.bulmacaFaktor && cpuDogruKombinasyon < this.bulmacaFaktor && this.tur == (this.bulmacaFaktor * this.bulmacaFaktor))
            this.oyunDurumu = OyunDurum.BERABERE;

        //console.log(oyuncuDogruKombinasyon);
        //console.log(cpuDogruKombinasyon);
        
        if (this.oyunDurumu == OyunDurum.KAYBETTI){
            cpu_skor++;
            document.getElementById("cpu_skor_tablo").innerHTML=cpu_skor;
            if (this.tipi==OyunTip.FRİEND){
                console.log("2.Oyuncu Kazandı!");
               
               return;
            }
            console.log("Kaybettin!");}
        if (this.oyunDurumu == OyunDurum.KAZANDI){
            oyuncu_skor++;
            document.getElementById("oyuncu_skor_tablo").innerHTML=oyuncu_skor;
        if (this.tipi==OyunTip.FRİEND){
            console.log("1.Oyuncu Kazandı!");
           return;
        }
        console.log("kazandın");
    }
  
        //else if (this.oyunDurumu != OyunDurum.BERABERE && this.oyunDurumu != OyunDurum.NORMAL)
        //    console.log("Kaybettin!");
        if (this.oyunDurumu == OyunDurum.BERABERE){
            console.log("Berabere!");
        beraberelik_sayisi++;
        document.getElementById("beraberelik_tablo").innerHTML=beraberelik_sayisi;
        }
        if (this.oyunDurumu != OyunDurum.NORMAL)
            oyunBittiMi = true;
        // inline if
        return oyunBittiMi  ? true : false;
    }
  
    cpuOyna() {
        sleep(350);
        var cpuOynadiMi = false;

        if (this.oyunKontrol())
            return;

        while (this.oyunDurumu == OyunDurum.NORMAL) {
            if (this.tur > (this.bulmacaFaktor * this.bulmacaFaktor)) 
                break;

            var rastgeleKolon = Math.floor(Math.random() * (this.bulmacaFaktor));
            var rastgeleKutucuk = Math.floor(Math.random() * (this.bulmacaFaktor));

            var kutucuk = this.kolonListesi[rastgeleKolon].kutucukListesi[rastgeleKutucuk];
            var kutucukDOM = kutucuk.domElementCek();
            if (kutucukDOM.innerHTML == "") {
                kutucukDOM.innerHTML = "O";
                cpuOynadiMi = true;
                break;
            }

            //break;
        }

        if (cpuOynadiMi) {
            this.tur++;
            this.oyunKontrol();
        }
    }
}