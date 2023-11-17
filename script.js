
// seleksi bagian bagain yang diperlukan

const place = document.querySelector('.place');
const num = document.querySelectorAll('.num');
const add = document.querySelectorAll('.add');
const opr = document.querySelectorAll('.opr');

// buat nambahin angka
num.forEach(e => {
    e.addEventListener('click', function (){
        if (place.innerText === '0' || place.innerText === '-0'){
            if (e.innerText === ','){
                place.innerText += e.innerText;
            } else {
            place.innerText = e.innerText;
            }
        } else if (place.innerText.length < 11){
            place.innerText += e.innerText;
            cekAngka(place.innerText);
        }
        if (place.innerText !== '0' ){
            add.forEach(a => {
                if (a.innerText === 'AC'){
                    a.innerText = 'C';
                }
            });
        }
    });
});

add.forEach(e => {
    e.addEventListener('click', function(){
        switch (e.innerText){
            case 'C':
                hapus();
                e.innerText = 'AC';
                break;
            case '+/-':
                kaliMinus();
                break;
            case '%':
                bagiSeratus(place.innerText)
                break;
        }
    });
});

let nilaiSebelum =  '0';
const samaDengan = document.querySelector('.sama-dengan');

opr.forEach(e => {
    e.addEventListener('click', function(){
        switch (e.innerText){
            case ':':
                if (samaDengan.classList.length > 3){
                    samaDengan.classList.replace(samaDengan.classList[3], 'bagi');
                } else {
                samaDengan.classList.add('bagi');
                }
                nilaiSebelum = place.innerText;
                place.innerText = '0';
                break;
            case 'x':
                if (samaDengan.classList.length > 3){
                    samaDengan.classList.replace(samaDengan.classList[3], 'kali');
                } else {
                samaDengan.classList.add('kali');
                }
                nilaiSebelum = place.innerText;
                place.innerText = '0';
                break;
            case '-':
                if (samaDengan.classList.length > 3){
                    samaDengan.classList.replace(samaDengan.classList[3], 'kurang');
                } else {
                samaDengan.classList.add('kurang');
                }
                nilaiSebelum = place.innerText;
                place.innerText = '0';
                break;
            case '+':
                if (samaDengan.classList.length > 3){
                    samaDengan.classList.replace(samaDengan.classList[3], 'tambah');
                } else {
                samaDengan.classList.add('tambah');
                }
                nilaiSebelum = place.innerText;
                place.innerText = '0';
                break;
            case '=':
                for (let i=0; i<opr.length; i++){
                        if (opr[i].classList.contains('animasiOperasi')){
                            opr[i].classList.remove('animasiOperasi');
                        }
                }
                if (samaDengan.classList.contains('tambah')){

                tambah(nilaiSebelum, place.innerText);
                samaDengan.classList.remove('tambah');

                } else if (samaDengan.classList.contains('kurang')){

                kurang(nilaiSebelum, place.innerText);
                samaDengan.classList.remove('kurang');

                } else if (samaDengan.classList.contains('kali')){

                kali(nilaiSebelum, place.innerText);
                samaDengan.classList.remove('kali');

                } else if (samaDengan.classList.contains('bagi')){
                bagi(nilaiSebelum, place.innerText);
                samaDengan.classList.remove('bagi');
                }
                break;
        }
    });
});

// kumpulan function function

// 4. pengerjaan operasi
function tambah (nilaiAwal, nilaiAkhir){
    const a = parseFloat(nilaiAwal.replaceAll('.','').replaceAll(',','.'));
    const b = parseFloat(nilaiAkhir.replaceAll('.','').replaceAll(',','.'));
    place.innerText = `${a + b}`.replaceAll('.',',');
    nilaiAwal = place.innerText;
    if (place.innerText.includes(',')){
        cekAngkaDesimal(place.innerText);
    } else {
        cekAngka(place.innerText);
    }
}

function kurang (nilaiAwal, nilaiAkhir){
    const a = parseFloat(nilaiAwal.replaceAll('.','').replaceAll(',','.'));
    const b = parseFloat(nilaiAkhir.replaceAll('.','').replaceAll(',','.'));
    place.innerText = `${a - b}`.replaceAll('.',',');
    nilaiAwal = place.innerText;
    if (place.innerText.includes(',')){
        cekAngkaDesimal(place.innerText);
    } else {
        cekAngka(place.innerText);
    }
}

function kali (nilaiAwal, nilaiAkhir){
    const a = parseFloat(nilaiAwal.replaceAll('.','').replaceAll(',','.'));
    const b = parseFloat(nilaiAkhir.replaceAll('.','').replaceAll(',','.'));
    place.innerText = `${a * b}`.replaceAll('.',',');
    nilaiAwal = place.innerText;
    if (place.innerText.includes(',')){
        cekAngkaDesimal(place.innerText);
    } else {
        cekAngka(place.innerText);
    }
}

function bagi (nilaiAwal, nilaiAkhir){
    const a = parseFloat(nilaiAwal.replaceAll('.','').replaceAll(',','.'));
    const b = parseFloat(nilaiAkhir.replaceAll('.','').replaceAll(',','.'));
    place.innerText = `${a / b}`.replaceAll('.',',');
    nilaiAwal = place.innerText;
    if (place.innerText.includes(',')){
        cekAngkaDesimal(place.innerText);
    } else {
        cekAngka(place.innerText);
    }
}

// 1. function buat nambahin titik
function cekAngka(angka){
    if (place.innerText.length > 7){
        place.style.fontSize = '2em';
    }
    const coba = [...angka.replaceAll('.','')];
    if (coba.includes(',')){
        return
    }
    if (coba.length <= 3){
        return angka
    }
    if (coba.length < 10 && coba.length > 3 && !coba.includes('-')){
        if (coba.length < 7){
            const awal  = coba.slice(0, coba.length-3);
            const akhir = coba.slice(coba.length-3, coba.length);
            const gabung = awal.concat('.',akhir);
            place.innerText = gabung.join('');
            return place.innerText
        } else {
            const awal = coba.slice(0, coba.length-6);
            const tengah = coba.slice(coba.length-6, coba.length-3);
            const akhir = coba.slice(coba.length-3, coba.length);
            const gabung = awal.concat('.', tengah).concat('.', akhir);
            place.innerText = gabung.join('');
            return place.innerText
        }
    }
    if (coba.includes('-') && coba.length > 4){
        cekAngka(angka.replaceAll('-','').replaceAll('.',''));
        place.innerText = '-' + place.innerText;
        return place.innerText
    }
}

function cekAngkaDesimal (angka){
    if (place.innerText.length > 7){
        place.style.fontSize = '2em';
    }
    let [a,b] = angka.split(',');
    a = cekAngka(a);
    place.innerText = a + ',' + b;
}

// 2. function buat additional feature
function hapus (){
    place.innerText = '0'
    place.style.fontSize = '3em';
}

function kaliMinus(){
    if (place.innerText.includes('-')){
        place.innerText = place.innerText.replace('-','');
    } else {
        place.innerText = '-' + place.innerText;
        cekAngka(place.innerText);
    }
}

function bagiSeratus(innerText){
    const a = innerText.replaceAll('.','').replaceAll(',','.');
    const hasil = `${a / 100}`;
    place.innerText = hasil.replaceAll('.',',');
    if (place.innerText.includes(',')){
    cekAngkaDesimal(place.innerText);
    } else {
        cekAngka(place.innerText);
    }
}


// animasi 
num.forEach(e => {
    e.addEventListener('click', function(){
        e.classList.add('animasiNomor');
        setTimeout(() =>{
            e.classList.remove('animasiNomor');
        },300)
    })
})
add.forEach(e => {
    e.addEventListener('click', function(){
        e.classList.add('animasiAdd');
        setTimeout(() =>{
            e.classList.remove('animasiAdd');
        },300)
    })
})

opr.forEach(e => {
    e.addEventListener('click', function(){
        for (let i = 0; i<opr.length; i++){
            opr[i].classList.remove('animasiOperasi');
        }
        e.classList.add('animasiOperasi');
        if (e.innerText === '='){
            setTimeout(() => {
                e.classList.remove('animasiOperasi');
            },200)
        }
    })
})