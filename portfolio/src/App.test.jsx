import App from "./App"
import React from "react"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test('Renders without crashing', ()=>{
    render(<App />);
    const button = screen.getByRole('button');
    expect(button).not.toBeInTheDocument();
})