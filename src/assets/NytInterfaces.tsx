export interface NytResponse { // needs exported
    copyright: string;
    response: {
        docs: Article[];
        meta: Meta;
    }
    status: string;
}

export interface Article { // needs exported
    abstract: string;
    byline: Byline;
    document_type: string;
    headline: Headline;
    keywords: Keywords[];
    multimedia: Multimedia[];
    news_desk: string;
    print_page: string;
    print_section: string;
    pub_date: string;
    section_name: string;
    snippet: string;
    source: string;
    subsection_name: string;
    type_of_material: string;
    uri: string;
    web_url: string;
    word_count: number;
    _id: string;
}

interface Byline {
    organization: string;
    original: string;
    person: Person[];
}

interface Person {
    firstname: string;
    lastname: string;
    middlename: string;
    organization: string;
    qualifier: string;
    rank: number;
    role: string;
    title: string;
}

export interface Headline { // needs exported
    content_kicker: string;
    kicker: string;
    main: string;
    name: string;
    print_headline: string;
    seo: string;
    sub: string;
}

interface Meta {
    hits: number;
    offset: number;
    time: number;
}

export interface Keywords { // needs exported
    major: string;
    name: string;
    rank: number;
    value: string;
}

export interface Multimedia { // needs exported
    caption: string;
    credit: string;
    crop_name: string;
    height: number;
    legacy: {
        xlarge: string;
        xlargeheight: number;
        xlargewidth: number;
    };
    rank: 0;
    subType: string;
    subtype: string;
    type: string;
    url: string;
    width: number;
}