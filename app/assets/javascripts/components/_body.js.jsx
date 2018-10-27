class Body extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fruits: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.addNewFruit = this.addNewFruit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteFruit = this.deleteFruit.bind(this)
        this.updateFruit = this.updateFruit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    componentDidMount(){
        fetch('/api/v1/fruits.json')
            .then((response) => {return response.json()})
            .then((data) => {this.setState({fruits: data})});
    }

    handleFormSubmit(name, description){
        let body = JSON.stringify({fruit: {name: name, description: description}})
        fetch('/api/v1/fruits.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then((response) => {return response.json()})
            .then((fruit) => this.addNewFruit(fruit) )
    }

    addNewFruit(){
        this.setState({fruits: this.state.fruits.contact(fruit)
        })
    }

    handleDelete(id) {
        fetch(`/api/v1/fruits/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(`${id} is deleted`);
            this.deleteFruit(id)
        })
    }

    deleteFruit(id){
        newFruits = this.state.fruits.filter((fruit) => fruit.id !== id)
        this.setState({fruits: newFruits})
    }

    handleUpdate(fruit){
        fetch(`/api/v1/fruits/${fruit.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fruit: fruit})
        }).then((response) => {
            this.updateFruit(fruit)
        })
    }

    updateFruit(fruit){
        let newfruits = this.state.fruits.filter((f) => f.id !== fruit.id)
        newfruits.push(fruit)
        this.setState({
            fruits: newfruits
        })
    }


    render(){
        return(
            <div>
                <NewFruit handleFormSubmit={this.handleFormSubmit}/>
                <AllFruits fruits={this.state.fruits} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
            </div>
        )
    }
}