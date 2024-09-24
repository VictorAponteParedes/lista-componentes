import React from 'react';
import {WebView} from 'react-native-webview';
import {View, Dimensions} from 'react-native';

export const VpostComponent = () => {
  const {width, height} = Dimensions.get('window');
  const vposHtml = `
    <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f2f2f2;
          }
          .container {
            background: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            width: 100%;
            max-width: 400px;
          }
          h1 {
            text-align: center;
            color: #333;
          }
          form {
            display: flex;
            flex-direction: column;
          }
          label {
            margin: 10px 0 5px;
            color: #555;
          }
          .input-container {
            display: flex;
            align-items: center;
            margin: 5px 0 15px;
          }
          .input-container i {
            margin-right: 10px;
            color: #888;
          }
          input[type="text"], input[type="submit"] {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            flex: 1;
          }
          input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
          }
          input[type="submit"]:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Pasarela de Pagos</h1>
          <form action="https://tu-vpos-url.com/pagar" method="POST">
            <label for="cardNumber">Número de Tarjeta:</label>
            <div class="input-container">
              <i class="fas fa-credit-card"></i>
              <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456">
            </div>
            <label for="expiryDate">Fecha de Expiración:</label>
            <div class="input-container">
              <i class="far fa-calendar-alt"></i>
              <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/AA">
            </div>
            <label for="cvv">CVV:</label>
            <div class="input-container">
              <i class="fas fa-lock"></i>
              <input type="text" id="cvv" name="cvv" placeholder="123">
            </div>
            <input type="submit" value="Pagar">
          </form>
        </div>
      </body>
    </html>
  `;

  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{html: vposHtml}}
        style={{width, height}}
      />
    </View>
  );
};
