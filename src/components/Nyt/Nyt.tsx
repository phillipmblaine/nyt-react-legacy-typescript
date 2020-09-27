import React from 'react';
import NytDisplay from './NtyDisplay/NytDisplay';
import './Nyt.css';
import { Article, NytResponse } from '../../assets/NytInterfaces';
import { isThisTypeNode } from 'typescript';

let pageNumber: number = 0;

// define the states needed for Nyt
type NytState = {
    apiKey: string;
    baseUrl: string;
    endDate?: string;
    // fetchUrl: string;
    // pageNumber: number;
    results: Article[];
    search: string;
    startDate?: string;
}

// declare the data types for the response (make own data types and specify so the fetch results can be properly managed) (interfaces) (consider putting in a separate file?)


// if props need to be inherited, could go here
type AcceptedProps = {

}

class Nyt extends React.Component<AcceptedProps, NytState> {
    constructor(props: NytState) {
        super(props)
        this.state = {
            apiKey: 'ittSmqpkxOVZMWDeGwHvdISRqXVG0bi5',
            baseUrl: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
            endDate: '',
            // fetchUrl: '',
            // pageNumber: 0,
            results: [],
            search: '',
            startDate: ''
        }
    }

    componentDidMount(): void {
        console.log('Executing componentDidMount.')
    }

    componentWillUpdate(): void {
        console.log(`Executing componentWillUpdate.`)
    }

    componentDidUpdate(): void {
        console.log('Executing componentDidUpdate.')
    }

    componentWillUnmount(): void {
        console.log('Executing componentWillUnmount.')
    }

    fetchNytResults(): void {
        console.log('Executing fetchNytResults.')
        // let fetchUrl: string = `${this.state.baseUrl}?api-key=${this.state.apiKey}&page=${this.state.pageNumber}&q=${this.state.search}`;
        let fetchUrl: string = `${this.state.baseUrl}?api-key=${this.state.apiKey}&page=${pageNumber}&q=${this.state.search}`;
        console.log('fetchUrl:', fetchUrl)
        fetchUrl = this.state.startDate
            ? fetchUrl + `&begin_date=${this.state.startDate}`
            : fetchUrl;
        fetchUrl = this.state.endDate
            ? fetchUrl + `&end_date=${this.state.endDate}`
            : fetchUrl;

        fetch(fetchUrl) // does this fetch function need a data type?
            .then(response => response.json())
            .then((data: NytResponse) => {
                this.setState({
                    results: data.response.docs
                })
                console.log(data)
            })
            .catch((error: Error) => console.log(error))
    }

    formSubmitHandler = (event: React.FormEvent): void => { // data type is FormEvent / React.FormEvent? // FormEvent is not recognized

        event.preventDefault(); // does preventDefault need a data type?
        // this.setState({
        //     pageNumber: 0
        // })
        pageNumber = 0;
        this.fetchNytResults();
    }

    changePageNumber = (event: React.MouseEvent<HTMLButtonElement>, direction: string): void => {
        event.preventDefault(); // does preventDefault need a data type?
        if (direction === 'down') {
            // if (this.state.pageNumber > 0) {
            if (pageNumber > 0) {
                // let pageIsDown: number = this.state.pageNumber - 1;
                pageNumber = pageNumber - 1;
                // this.setState({
                //     pageNumber: pageIsDown
                // })
                this.fetchNytResults();
            }
        }
        if (direction === 'up') {
            // let pageIsUp: number = this.state.pageNumber + 1;
            pageNumber = pageNumber + 1;
            // this.setState({
            //     pageNumber: pageIsUp
            // })
            this.fetchNytResults();
        }
    }

    render() {
        return (
            <div className="main">
                <div className="mainDiv">
                    <div>
                        <h1>Hello from Nyt</h1>
                    </div>

                    <form onSubmit={(e): void => this.formSubmitHandler(e)}>
                        <span>Enter a single search term (required): </span>
                        <br />
                        <br />
                        <input type="text" name="search" required onChange={(e): void => {
                            this.setState({
                                search: e.target.value
                            })
                        }} />

                        <br />
                        <br />

                        <span>Enter a start date: </span>
                        <br />
                        <br />
                        <input type="date" name="startDate" pattern="[0-9]{8}" onChange={(e): void => {
                            this.setState({
                                startDate: e.target.value
                                // startDate: e.target.value.split('-').join('') // in case nyt fetch needed a date format with no dashes, removes dashes between date numbers, seems it's not necessary
                            })
                            // console.log('startDate:', this.state.startDate)
                        }} />

                        <br />
                        <br />

                        <span>Enter an end date: </span>
                        <br />
                        <br />
                        <input type="date" name="endDate" pattern="[0-9]{8}" onChange={(e): void => {
                            this.setState({
                                endDate: e.target.value
                                // endDate: e.target.value.split('-').join('') // removes dashes between date numbers
                            })
                            // console.log('endDate:', this.state.endDate)
                        }} />

                        <br />
                        <br />

                        <button className="submit">Submit search</button>
                    </form>

                    <div>
                        <p>Search (Results Top): {this.state.search}</p>
                        {/* <p>Page Number (Top): {this.state.pageNumber}</p> */}
                        <p>Page Number (Results Top): {pageNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />

                    <div>
                        {
                            this.state.results.length > 0
                                ? <NytDisplay
                                    results={this.state.results}
                                    changePageNumber={this.changePageNumber}
                                    // pageNumber={this.state.pageNumber}
                                    pageNumber={pageNumber}
                                />
                                : null
                        }
                    </div>

                    <br />
                    <hr />
                    <br />

                    <div>
                        <p>Search (Results Bottom): {this.state.search}</p>
                        {/* <p>Page Number (Bottom): {this.state.pageNumber}</p> */}
                        <p>Page Number (Results Bottom): {pageNumber}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nyt;