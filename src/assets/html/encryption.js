
const _keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encode(e) {
  let t = "";
  let n, r, i, s, o, u, a;
  let f = 0;
  e = utf8_encode(e);
  while (f < e.length) {
    n = e.charCodeAt(f++);
    r = e.charCodeAt(f++);
    i = e.charCodeAt(f++);
    s = n >> 2;
    o = ((n & 3) << 4) | (r >> 4);
    u = ((r & 15) << 2) | (i >> 6);
    a = i & 63;
    if (isNaN(r)) {
      u = a = 64;
    } else if (isNaN(i)) {
      a = 64;
    }
    t =
      t +
      _keyStr.charAt(s) +
      _keyStr.charAt(o) +
      _keyStr.charAt(u) +
      _keyStr.charAt(a);
  }
  return t;
}
function decode(e) {
  let t = "";
  let n, r, i;
  let s, o, u, a;
  let f = 0;
  e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (f < e.length) {
    s = _keyStr.indexOf(e.charAt(f++));
    o = _keyStr.indexOf(e.charAt(f++));
    u = _keyStr.indexOf(e.charAt(f++));
    a = _keyStr.indexOf(e.charAt(f++));
    n = (s << 2) | (o >> 4);
    r = ((o & 15) << 4) | (u >> 2);
    i = ((u & 3) << 6) | a;
    t = t + String.fromCharCode(n);
    if (u != 64) {
      t = t + String.fromCharCode(r);
    }
    if (a != 64) {
      t = t + String.fromCharCode(i);
    }
  }
  t = _utf8_decode(t);
  return t;
}
function utf8_encode(e) {
  e = e.replace(/\r\n/g, "\n");
  let t = "";
  for (let n = 0; n < e.length; n++) {
    let r = e.charCodeAt(n);
    if (r < 128) {
      t += String.fromCharCode(r);
    } else if (r > 127 && r < 2048) {
      t += String.fromCharCode((r >> 6) | 192);
      t += String.fromCharCode((r & 63) | 128);
    } else {
      t += String.fromCharCode((r >> 12) | 224);
      t += String.fromCharCode(((r >> 6) & 63) | 128);
      t += String.fromCharCode((r & 63) | 128);
    }
  }
  return t;
}

function _utf8_decode(e) {
  let t = "";
  let n = 0;
  let r = 0;
  let c1 = 0;
  let c2 = 0;
  let c3;
  while (n < e.length) {
    r = e.charCodeAt(n);
    if (r < 128) {
      t += String.fromCharCode(r);
      n++;
    } else if (r > 191 && r < 224) {
      c2 = e.charCodeAt(n + 1);
      t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
      n += 2;
    } else {
      c2 = e.charCodeAt(n + 1);
      c3 = e.charCodeAt(n + 2);
      t += String.fromCharCode(((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      n += 3;
    }
  }
  return t;
}

function encrypt(dataToEncrypt, aesPublicKey) {
  let hash = sjcl.hash.sha256.hash(dataToEncrypt);
  let payloadHash = sjcl.codec.hex.fromBits(hash);
  let ct, p;
  let timestamp = new Date().toISOString();
  let iv = timestamp.substr(timestamp.length - 8);
  let key = sjcl.codec.hex.fromBits(sjcl.random.randomWords(32, 0));
  p = {
    adata: "",
    iter: 1000,
    mode: "ccm",
    ts: parseInt("64"),
    ks: parseInt("256"),
    iv: encode(iv),
    salt: encode(iv),
  };
  ct = sjcl.encrypt(key, dataToEncrypt, p);
  ct = JSON.parse(ct);
  let encryptedRawPayload = encode(ct.ct);
  let encryptedRandomKey = "";
  {
    let randomCT, randomPayload;
    randomPayload = {
      adata: "",
      iter: 1000,
      mode: "ccm",
      ts: parseInt("64"),
      ks: parseInt("256"),
      iv: encode(iv),
      salt: encode(iv),
    };
    randomCT = sjcl.encrypt(aesPublicKey, key, randomPayload);
    randomCT = JSON.parse(randomCT);
    encryptedRandomKey = encode(randomCT.ct);
  }
  let headers = {
    "x-appiyo-key": encryptedRandomKey,
    "x-appiyo-hash": payloadHash,
    "x-appiyo-ts": timestamp,
    "Content-Type": "text/html",
  };
  let request = {
    rawPayload: encryptedRawPayload,
    headers: headers,
  };
  return request;
}

function decrypt(randKey, timeStamp, responseHash, encryptedRes, aesPublicKey) {
  let decryptedKey = decryptAES(
    decode(randKey),
    aesPublicKey,
    timeStamp
  );
  let decryptedResponse = decryptAES(
    decode(encryptedRes),
    decryptedKey,
    timeStamp
  );
  let hash = sjcl.hash.sha256.hash(decryptedResponse);
  let payloadHash = sjcl.codec.hex.fromBits(hash);
  if (payloadHash !== responseHash) {
    decryptedResponse = "{message: 'Malformed response'}";
  }
  return decryptedResponse;
}

function decryptAES(encryptedData, key, timestamp) {
  let rp = {};
  let plaintext;
  let iv = timestamp.substr(timestamp.length - 8);
  try {
    let ciphertext = encryptedData;
    let dataToDecrypt = {
      iv: encode(iv),
      salt: encode(iv),
      ct: ciphertext,
      mode: "ccm",
      v: 1,
      ks: 256,
      iter: 1000,
      adata: "",
      ts: 64,
    };
    // plaintext = sjcl.decrypt(key, JSON.stringify(dataToDecrypt), {}, rp);
    plaintext = sjcl.decrypt(key, JSON.stringify(dataToDecrypt), {}, rp);
  } catch (e) {
    console.log(e);
    return;
  }
  return plaintext;
}
function decryptResponse(event) {
  var timestamp = event.headers.get("x-appiyo-ts");
  var randomkey = event.headers.get("x-appiyo-key");
  var responseHash = event.headers.get("x-appiyo-hash");
  if (timestamp != null) {
    try {
      let decryption = decrypt(
        randomkey,
        timestamp,
        responseHash,
        event.body || event.error,
        publicKey
      );
      return decryption;
    } catch (e) {
      console.log(e);
    }
    return null;
  } else {
    return false;
  }
}

function decryptMobileResponse(event) {
  var timestamp = event.headers["x-appiyo-ts"];
  var randomkey = event.headers["x-appiyo-key"];
  var responseHash = event.headers["x-appiyo-hash"];
  if (timestamp != null) {
    try {
      let decryption = decrypt(
        randomkey,
        timestamp,
        responseHash,
        event.data || event.error,
        publicKey
      );
      return decryption;
    } catch (e) {
      console.log(e);
    }
    return null;
  } else {
    return false;
  }
}
