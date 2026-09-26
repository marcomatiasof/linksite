const key = "34999929764";
const name = "MARCO AURELIO DIAS MATIAS";
const city = "SAO PAULO";
const payload = `00020126330014br.gov.bcb.pix01${String(key.length).padStart(2, '0')}${key}5204000053039865802BR59${String(name.length).padStart(2, '0')}${name}60${String(city.length).padStart(2, '0')}${city}62070503***6304`;

function crc16(data) {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) > 0) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc = crc << 1;
            }
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

console.log(payload + crc16(payload));
