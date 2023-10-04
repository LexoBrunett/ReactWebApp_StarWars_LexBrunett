import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto py-5 text-center">
		<p className="footertext fs-3">2023 ©  
		<Link to="https://github.com/LexoBrunett">LexoBrunett</Link>
		</p>
	</footer>
);