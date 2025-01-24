import { createGlobalStyle } from 'styled-components';
import background from './background.jpg'

const GlobalStyle = createGlobalStyle`
  html {
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  body {
    position: relative;
    margin: 0;
    width: 70%;
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: #ffffff;
    text-align: center;
    font-size: 40px;

  }

  div {
    background-color: #2d2d43;
    div.App {
      text-indent: -5%;
    }
  }

  div#root {
    min-height: 100vh;
  }

  div.Pilote {
    height: 100%;
  }

  li.Circuit {
    margin: 5%;
  }

  table {
    font-size: 30px;
    
  }

  table.Drivers{
    padding-left: 13%;
    text-indent: 5%;
    border-spacing: 5%;
  }

  table.Constructors {
    padding-left: 23.5%;
  }

  tr {
    text-indent: 5%;
    
  }

  tr.Legende {
    font-size: 30px;
    
  }

  ul {
    list-style: none;
  }

  p {
    margin: 0;
  }

  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #2d2d43;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 9999; /* Assure que la popup est au-dessus de tout le reste */
  }
  
  .popup-content {
    text-align: center;
  }

  #rb9 {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    cursor: pointer;
  }

  .pilote, .constructeur {
    cursor: pointer;
  }

  .resultat {
    padding-left: 10%;
    text-indent: 5%;
    border-spacing: 5%;
  }

  li {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  h4.homeTitle {
    padding-left: 4vh;
  }

  img.car {
    width: 50%;
    height: 50%;
  }

  .yearList {
    margin-bottom: 3%;
    padding-left: 1%;
  }

  .DateArticle {
    font-size: 50%;
  }

  .ArticleCatchphrase {
    font-weight: bold;
    font-size: 90%;
    margin-top: 5%;
    margin-bottom: 5%;
    margin-left: 2%;
    margin-right: 2%;
  }

  .ArticleContent {
    font-size: 80%;
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    margin-left: 2%;
    margin-right: 2%;
  }

  .driverImage {
    width: 25%;
    height: 25%;
  }

  .constructorImage {
    width: 25%;
    height: 25%;
  }

  .circuitImage {
    width: 50%;
    height: 50%;
  }
`;

export default GlobalStyle;