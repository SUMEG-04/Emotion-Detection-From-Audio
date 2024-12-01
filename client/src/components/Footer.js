// src/components/Footer.js
import React from 'react';
import { FooterContainer, FooterLogo, FooterLinks, FooterLink, FooterSocialIcons, FooterSocialIcon, FooterCopyright } from './Footer.styled';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterLogo>EmotionApp</FooterLogo>
            <FooterLinks>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </FooterLinks>
            <FooterSocialIcons>
                <FooterSocialIcon href="https://facebook.com" target="_blank"><FaFacebookF /></FooterSocialIcon>
                <FooterSocialIcon href="https://twitter.com" target="_blank"><FaTwitter /></FooterSocialIcon>
                <FooterSocialIcon href="https://instagram.com" target="_blank"><FaInstagram /></FooterSocialIcon>
                <FooterSocialIcon href="https://linkedin.com" target="_blank"><FaLinkedinIn /></FooterSocialIcon>
            </FooterSocialIcons>
            <FooterCopyright>
                © {new Date().getFullYear()} EmotionApp. All rights reserved.
            </FooterCopyright>
        </FooterContainer>
    );
};

export default Footer;
