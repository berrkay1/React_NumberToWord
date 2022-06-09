import React ,{useState} from 'react'

function NumberToWord() {

    const [inputValue, setInputValue] = useState(0);
    const [items, setItems] = useState([]);
    const text = numToWord(inputValue);


    function numToWord(sayi) {
        let inputSayi = sayi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").split(",");

        let tamsayi = inputSayi[0];
        let ondalik = "";



        var birler = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
        var onlar = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
        var binler = ["", "bin", "milyon", "milyar", "trilyon", "katrilyon"];
        var sonuc = [];

        var adim = 0;

        for (let i = tamsayi.split(".").length; i > 0; i--) {
            sayi = tamsayi.split(".")[i - 1];
            if (sayi.length === 1) { sayi = "00" + sayi; }
            if (sayi.length === 2) { sayi = "0" + sayi; }

            let c = "";

            for (let j = 1; j < sayi.length + 1; j++) {
                if (j === 1 && sayi[j - 1] === 1) { c += " yüz "; }
                else if (j === 1 && birler[sayi[j - 1]] !== "") { c += birler[sayi[j - 1]] + " yüz "; }
                else if (j === 2) { c += onlar[sayi[j - 1]] + " "; }
                else if (j === 3 && tamsayi.length === 5 && sayi[j - 1] === 1 && adim === 1) { c += " "; }
                else if (j === 3) { c += birler[sayi[j - 1]] + " "; }
            }

            if (c !== "") { sonuc.push(c + binler[adim]); }
            adim++;
        }


        if (sonuc.length !== 0) { sonuc = sonuc.reverse().join(" "); } else { sonuc = ""; }
        if (ondalik.length === 1) { ondalik = ondalik + "0"; }
        if (ondalik !== "") {
            sonuc += " " + onlar[ondalik[0]] + " " + birler[ondalik[1]];
        }

        sonuc = sonuc.replace(/ /g, " ").trim();

        return sonuc;

    }

    const handleAdd = () => {
        setItems([text])
        setInputValue('')
        
    }

    const handleDeleteItem = () => {
        const textSayi = document.getElementById('text');
        textSayi.innerHTML = ''
    }

  return (
    <div className="app">
    <div className='form'>
        <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} type="number"
            placeholder='Lütfen bir sayi girin'
            min={0}
        />
        <button className='add'
            onClick={handleAdd}
        >
            Ekle
        </button>
        <button className='delete'
            onClick={handleDeleteItem}
        >
            Temizle
        </button>
    </div>

    <div className="textList">
        {
            items.map((item, index) => (
                <h4 id='text' key={index}>{item}</h4>
            ))
        }
    </div>


</div>
  )
}

export default NumberToWord