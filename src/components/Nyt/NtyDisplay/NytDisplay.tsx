import React from 'react';
import './NytDisplay.css';
import { Article, Keywords } from '../../../assets/NytInterfaces'

// define the incoming props needed for NytDisplay
type AcceptedProps = {
    results: Article[];
    changePageNumber: (event: React.MouseEvent<HTMLButtonElement>, direction: string) => void;
    pageNumber: number;
}

const NytDisplay: React.FunctionComponent<AcceptedProps> = (props) => {
    return (
        <div className="NytDisplayMainDiv">
            <div>
                <h1>Hello from NytDisplay</h1>
            </div>
            {
                props.results.map((value: Article) => (
                    <div key={value._id}>
                        <h2>{value.headline.main}</h2>
                        {
                            value.multimedia.length > 1
                                ? (
                                    <img
                                        alt="article"
                                        src={`http://www.nytimes.com/${value.multimedia[1].url}`}
                                    />
                                )
                                : (
                                    null
                                )
                        }
                        <p>
                            {value.snippet}
                            <br />
                            <br />
                            {
                                value.keywords.length > 0
                                    ? 'Keywords: '
                                    : ''
                            }
                            {
                                value.keywords.length > 0
                            }
                        </p>
                        <ul>
                            {
                                value.keywords.map((keyword: Keywords) => (
                                    <li key={keyword.value}>{keyword.value}</li>
                                ))
                            }
                        </ul>
                        <a target='_blank' rel="noopener noreferrer" href={value.web_url}>
                            <button>Read Full Article (New Tab)</button>
                        </a>
                    </div>
                ))
            }
            <div className="changePageButtonDiv">
                <button id="prevButton" onClick={(e): void => props.changePageNumber(e, 'down')}>Previous 10</button>
                <button id="nextButton" onClick={(e): void => props.changePageNumber(e, 'up')}>Next 10</button>
            </div>
            <br />
        </div>
    )
}

export default NytDisplay;