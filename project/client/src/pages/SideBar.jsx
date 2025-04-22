import "../App.css";
function Input({handleFilters, value, title, name}) {
    return (
        <label className="sidebar-label-container">
                <input onChange={handleFilters} type="radio" name={name} value={value}/>
                <span className="checkmark"></span>{title}
        </label>
    )
}

function Colour({handleFilters}) {
    return(
        <>
            <h2>Fur Colour</h2>

            <div style={{flex: 1, flexDirection: "column"}}>
                <Input 
                handleFilters={handleFilters}
                value="White"
                title="White"
                name="colour"
                />
                <Input 
                handleFilters={handleFilters}
                value="Black"
                title="Black"
                name="colour"
                />
                <Input 
                handleFilters={handleFilters}
                value="Orange"
                title="Orange"
                name="colour"
                />
                <Input 
                handleFilters={handleFilters}
                value="Gray"
                title="Gray"
                name="colour"
                />
                <Input 
                handleFilters={handleFilters}
                value="Mixed"
                title="Mixed"
                name="colour"
                />
            </div>
        </>
    )
}

function Price({handleFilters}) {
    return(
        <>
            <h2>Price</h2>

            <div style={{flex: 1, flexDirection: "column"}}>
                <Input 
                    handleFilters={handleFilters}
                    value="0"
                    title="None"
                    name="price"
                />
                <Input 
                    handleFilters={handleFilters}
                    value="1"
                    title="$0 - $50"
                    name="price"
                />
                <Input 
                    handleFilters={handleFilters}
                    value="2"
                    title="$50 - $100"
                    name="price"
                />
                <Input 
                    handleFilters={handleFilters}
                    value="3"
                    title="$100 - $150"
                    name="price"
                />
                <Input 
                    handleFilters={handleFilters}
                    value="4"
                    title="$150 - $200"
                    name="price"
                />
                <Input 
                    handleFilters={handleFilters}
                    value="5"
                    title="$200+"
                    name="price"
                />
            </div>
        </>
    )
}

function Ratings({handleFilters}) {
    
    return(
        <>
            <h2>Minimum Rating</h2>

            <div>
                <input type="number" name="minRating" min="1" max="5" className="textInput" onChange={handleFilters} />
            </div>

            <h2>Maximum Rating</h2>
            <div>
                <input type="number" name="maxRating"  min="1" max="5" className="textInput" onChange={handleFilters} />
            </div>
        </>
    )
}

function Sidebar({handleFilters, fetchFilteredData}) {
    return(
        <section className="sidebar">
            <div>
                <h1>Filters</h1>
                <Colour handleFilters={handleFilters} />
                <br/>
                <Price handleFilters={handleFilters} />
                <br/>
                <Ratings handleFilters={handleFilters} />
                <br />
                <button style={{backgroundColor: "#5cf"}} onClick={() => {fetchFilteredData()}}>Apply Filters</button>
            </div>
        </section>
    )
}

export default Sidebar;
