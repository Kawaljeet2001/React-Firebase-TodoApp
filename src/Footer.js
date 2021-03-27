import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = () => {
    return (
        <div className = 'footer'>
            <a href = 'https://github.com/Kawaljeet2001/React-Firebase-TodoApp' style = {{'text-decoration' : 'none'}}>
                <GitHubIcon className = 'icons' fontSize = 'default'/>   
            </a> 
            <a href = 'https://www.linkedin.com/in/kawaljeetsinghbatra/' style = {{'text-decoration' : 'none'}}>
                <LinkedInIcon className = 'icons' fontSize = 'default'/>
            </a>            
        </div>
    )
}

export default Footer
