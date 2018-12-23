import React from "react";

export default class App extends React.Component {
    render(){
        return (
            <FilterableProductList data={mockData}/>
        )
    }
}

const mockData = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class FilterableProductList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchWords: "",
            onlyShowStock: false,
        }

        this.handleSearchWordsChange = this.handleSearchWordsChange.bind(this);
        this.handleStockFilterChange = this.handleStockFilterChange.bind(this);
    }

    handleSearchWordsChange(searchWords){
        this.setState({
            searchWords
        });
    }

    handleStockFilterChange(onlyShowStock){
        this.setState({
            onlyShowStock
        });
    }

    render(){
        let data = this.props.data;
        let onlyShowStock = this.state.onlyShowStock;
        let searchWords = this.state.searchWords;
        
        if(onlyShowStock){
            data = data.filter(d => d.stocked)
        }

        if(searchWords){
            data = data.filter(d => d.name.includes(searchWords));
        }

        return (
            <div>
                <SearchBar
                    onSearchWordsChange={this.handleSearchWordsChange}
                    onStockFilterChange={this.handleStockFilterChange}
                />
                <ProductList data={data}/>
            </div>
        )
    }
}

/**
 * @type {React.ComponentClass<{onSearchWordsChange: (searchWord: string) => void , onStockFilterChange: (isStock: boolean) => void}, {}>}
 */
class SearchBar extends React.Component {

    render(){
        return (
            <div>
                <p><input
                    placeholder="search"
                    onChange={e => this.props.onSearchWordsChange(e.target.value)}
                    /></p>
                <p>
                    <label>
                        <input
                            type="checkbox"
                            onChange={e => this.props.onStockFilterChange(e.target.checked)}
                            />
                        Only show product in stock
                    </label>
                </p>
            </div>
        )
    }
}

class ProductList extends React.Component {
    render(){

        /** @type {typeof mockData} */
        let data = this.props.data;

        let categoriedData = data.reduce((categoriedData, data) => {
            let category = data.category;
            if(categoriedData.every(cd => cd.category !== category)){
                categoriedData.push({
                    category,
                    list: []
                });
            }
            let cd = categoriedData.find(cd => cd.category === category);
            cd.list.push(data)
            return categoriedData;
        }, /** @type {{category: string, list: typeof mockData}[]} */([]));
        

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{
                    categoriedData.length !== 0
                    ? categoriedData.map(cd => 
                        <React.Fragment key={cd.category}>
                            <tr className="category-header">
                                <th colSpan="2">{cd.category}</th>
                            </tr>
                            {cd.list.map(d=> <ProductItem data={d} key={d.name} />)}
                        </React.Fragment>
                    )
                    : <tr><td colSpan="2">No data</td></tr>
                }
                </tbody>
            </table>
        )
    }
}

/**
 * @param {{data: typeof mockData[i extends number]}} props
 */
function ProductItem (props) {
    let d = props.data;
    return (
        <tr>
            <td className={d.stocked ? "" : "nostock"}>{d.name}</td>
            <td>{d.price}</td>
        </tr>
    )
}
