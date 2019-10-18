class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */

    constructor(config) {

        if (!config) {

            throw new Error('Config isn\'t passed');
        }

        this.initialState = config.initial;
        this.history = [this.initialState];
        this.cancelled = [];
        this.currState = config.initial;
        this.allStates = config.states;
    }

    /**
     * Returns active state.
     * @returns {String}
     */

    getState() {

        return this.currState;
    }

    /**
     * Goes to specified state.
     * @param state
     */

    changeState(state) {

        if (!state || !this.allStates[state]) {

            throw new Error('State isn\'t passed');
        }

        this.cancelled = [];
        this.currState = state;
        this.history.push(this.getState());

        return true;

    }


    /**
     * Changes state according to event transition rules.
     * @param event
     */

    trigger(event) {

        let currEvent = this.allStates[this.getState()].transitions[event];

        if (!currEvent) {

            throw new Error('Event in current state isn\'t exist');

        }

        return this.changeState(currEvent);

    }


    /**
     * Resets FSM state to initial.
     */

    reset() {

        return this.changeState(this.initialState)
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * 
     * @param event
     * @returns {Array}
     */


    getStates(event) {

        return Object.keys(this.allStates).filter((state) =>

            this.allStates[state].transitions[event] || !event
        );

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */

    undo() {

        return (this.history.length > 1 && this.getState() == this.history.pop()) ?

            (this.cancelled.push(this.getState()), this.currState = this.history[this.history.length - 1], true) : false;

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */

    redo() {


        return (!this.cancelled.length) ?

            false : (this.history.push(this.getState()), this.currState = this.cancelled.pop(), true);

    }

    /**
     * Clears transition history
     */

    clearHistory() {
        this.cancelled = [];
        this.history = [];

    }
}

module.exports = FSM;


/** @Created by Uladzimir Halushka **/