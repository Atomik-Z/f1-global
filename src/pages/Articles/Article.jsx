import ArticleList from '../../data/ArticleList.json';
import { useParams } from 'react-router-dom';

function Article() {
    const { idArticle } = useParams();

    const article = ArticleList.ArticleList.find(a => a.idArticle === idArticle);
    return (
        <div class="Article">
            <h4>{article.titre}</h4>
            <p class="DateArticle">Le {article.date}</p>
            <div>
                <p class="ArticleCatchphrase">{article.catchphrase}</p>
                {article.contenu.map((paragraphe, index) => (
                    <p key={index} class="ArticleContent">{`${paragraphe}`}</p>
                ))}
            </div>
        </div>
    )
}

export default Article