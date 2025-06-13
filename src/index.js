import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/'
import Classements from './pages/Classements/Classements'
import Calendrier from './pages/Calendrier/Calendrier'
import Header from './components/Header'
// On ajoute nos composants
import ClassementPilote from './components/ClassementPilotes'
import ClassementConstructeur from './components/ClassementConstructeurs'
import Error from './components/Error'
import GlobalStyle from './assets/globalStyle'
import Pilote from './pages/Pilotes'
import Constructeur from './pages/Constructeurs'
import { Provider } from 'react-redux'
import { store } from './store'
import Resultat from './pages/Resultats/Resultat'
import Garage from './pages/Garage/Garage'
import Records from './pages/Records/Records'
import RecordsPilotes from './pages/Records/Records Pilotes/RecordsPilotes'
import RecordsConstructeurs from './pages/Records/Records Constructeurs/RecordsConstructeurs'
import PilotesCarriere from './pages/Records/Records Pilotes/PilotesCarriere'
import PilotesSaison from './pages/Records/Records Pilotes/PilotesSaison'
import ConstructeursCarriere from './pages/Records/Records Constructeurs/ConstructeursCarriere'
import ConstructeursSaison from './pages/Records/Records Constructeurs/ConstructeursSaison'
import LastResult from './pages/Resultats/LastResult'
import InfoVoiture from './pages/Garage/InfoVoiture'
import Article from './pages/Articles/Article'
import Lexique from './pages/Lexique/Lexique'
import InfoCircuit from './pages/Circuit/InfoCircuit'

const season="2025";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
        <Router>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/classements" element={<Classements />}>
                    { /* Nous imbriquons nos composants dans Classements */}
                    <Route path=":year/pilotes" element={<ClassementPilote />} />
                    <Route path=":year/constructeurs" element={<ClassementConstructeur />} />
                </Route>
                <Route path="/calendrier" element={<Calendrier year={season} /> } />
                <Route path="/garage" element={<Garage />} />
                <Route path="/:car" element={<InfoVoiture />} />
                <Route path="/driver/:driverId" element={<Pilote />} />
                <Route path="/constructor/:constructorId" element={<Constructeur />} />
                <Route path="/circuits/:circuitId" element={<InfoCircuit />} />
                <Route path="/calendrier/:year/:race/results" element={<Resultat />} />
                <Route path="/records" element={<Records />}>
                    <Route path="pilote" element={<RecordsPilotes />}>
                        <Route path="carriere" element={<PilotesCarriere />} />
                        <Route path="saison" element={<PilotesSaison />} />
                    </Route>
                    <Route path="constructeur" element={<RecordsConstructeurs />}>
                        <Route path="carriere" element={<ConstructeursCarriere />} />
                        <Route path="saison" element={<ConstructeursSaison />} />
                    </Route>
                </Route>
                <Route path="latest/results" element={<LastResult />} />
                <Route path="/article/:idArticle" element={<Article />} />
                <Route path="/lexique" element={<Lexique />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
        </Provider>   
    </React.StrictMode>,
    document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

