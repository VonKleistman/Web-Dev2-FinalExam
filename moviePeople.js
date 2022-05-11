const TMDBPATH = "https://api.themoviedb.org/3/person/popular?api_key=7417015bd49ede14978e21e667b247e6"
//^^^^^ image path for the popular actor category
Vue.component("person-comp", {//<<<< Makes our custom component
    template: `
    <div>
        <h2>{{person_obj.name}}</h2>
        <p v-if="showingBio == true">{{personDetails.biography}}</p>
        <button @click="bioSwitch()">{{buttonMessage}}</button>
    </div>
    `,//^^template for our component. references our data through the power of Vue

    props:["person_obj"],//<<<Our one property, it's a whole object

    data() {//<<Since we are in a component, we need to do data with parenthesis
        return {//<<Also need to return from within a component
            showingBio: false,
            gotBio: false,
            //^^^^State control
            person: this.person_obj,
            //^^^ Grabbed in case it needed to be manipulated for some reason
            personDetails: {},
            //^^^ This will hold more detailed info. needed to get the biography
            buttonMessage: "Get Bio",
            //^^^ button message to allow easy multiuse buttons that aren't confusing
        }
    },

    methods: {
        bioSwitch(){//<<<< State control and calls the next method
            console.log(this.buttonMessage);
            if(this.buttonMessage == "Get Bio"){
                this.buttonMessage = "Hide Bio";
            }else{
                this.buttonMessage = "Get Bio";
            }
            this.showBio(this.person_obj.id);
        },

        showBio(personID){//<<<< Does something depending on the state
            if(this.gotBio == false){
                this.getPersonDetails(personID);
            }
            if(this.showingBio == false){
                this.showingBio = true;
            }else{
                this.showingBio = false;
            }
        },

        getPersonDetails(personID){//<<<< getting specific person details with another api call. Will only be called once per person no matter how many times the button is clicked.
            axios.get(`https://api.themoviedb.org/3/person/${personID}?api_key=7417015bd49ede14978e21e667b247e6&language=en-US`).then(response => {
                console.log(response.data);
                this.personDetails = response.data;
                this.gotBio = true;
            });
        }//^^^^^^Just an axios call to get api information
    }
})

let App = new Vue({//<<< Vue app instance. used it remarkably little
    el: "#app",//<<<link the element via the id

    data: {
        people: []//will contain our array of people without the bio
    }
})

axios.get(TMDBPATH).then(response => {
    console.log(response.data.results);
    App.people = response.data.results;
    console.log(App.people);
});//^^^^^ Axios call... Again. This time grabbing the 20 most popular people