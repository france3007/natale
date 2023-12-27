// import React, { Component } from 'react';
// import FacebookLogin from 'react-facebook-login';

// export default class Facebook extends Component {

//     state = {
//         auth: false,
//         name: '',
//         picture: ''
//     };

//     responseFacebook = response => {
//         console.log(response);
//         if (response.status !== 'unknown') {
//             this.setState({
//                 auth: true,
//                 name: response.name,
//                 email: response.email,
//                 password: response.password
//             });
//         }
//     }

//     componentClicked = () => {
//         console.log('Facebook btn clicked');
//     }

//     render() {
//         let facebookData;

//         this.state.auth ?
//             facebookData = (
//                 <div style={{
//                     width: '400px',
//                     margin: 'auto',
//                     background: '#f4f4f4',
//                     padding: '20px',
//                     color: '#000'
//                 }}>
                    
//                 </div>
//             ) :
//             facebookData = (
//                 <FacebookLogin
//                     appId="854604913120580"
//                     autoLoad={true}
//                     fields="name,email,password"
//                     onClick={this.componentClicked}
//                     callback={this.responseFacebook}
//                 />
//             );

//         return (
//             <>
//                 {facebookData}
//             </>
//         );
//     }
// }
