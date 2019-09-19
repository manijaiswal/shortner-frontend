import React from 'react';
import { connect } from 'react-redux';
import Root from "../components/Root";
import {postData,fetchFunction} from '../actions/apiActions';

const RootContainer = props=><Root {...props} />;
const mapStateToProps = (state) =>{
    return {
        profile:state.api.profile
    }
}

export default connect(mapStateToProps,{
   postData,
   fetchFunction 
})(RootContainer);