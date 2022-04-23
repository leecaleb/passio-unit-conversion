/**
 * @jest-environment jsdom
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { screen, fireEvent, act } from "@testing-library/react";
import {logRoles} from '@testing-library/dom'
import UnitConverstionScreen from '../screens/UnitConversionScreen'

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

it('rerenders height with updated value after switch units', async() => {
    await act( async () => {
      ReactDOM.createRoot(container).render(<UnitConverstionScreen />);
    });
    const heightTextField  = await screen.findByTestId('Height')
    const weightTextField = await screen.findByTestId('Weight')
    
    expect(heightTextField.value).toBe("")
    expect(weightTextField.value).toBe("")
    
    // type 1000 into height text field
    fireEvent.change(heightTextField, {target: { value: "1000"}})
    
    expect(heightTextField.value).toBe("1000")
    expect(weightTextField.value).toBe("")

    // select metric in the units dropdown
    const wrapperNode  = await screen.findByTestId('select-filled')
    const selectNode = wrapperNode.childNodes[0];
    fireEvent.mouseDown(selectNode);
    fireEvent.click(screen.getByText("Metric"));
    
    expect(heightTextField.value).toBe("304.8")
    expect(weightTextField.value).toBe("")
});

it('rerenders weight with updated value after switch units', async() => {
  await act( async () => {
    ReactDOM.createRoot(container).render(<UnitConverstionScreen />);
  });
  const heightTextField  = await screen.findByTestId('Height')
  const weightTextField = await screen.findByTestId('Weight')
  
  expect(heightTextField.value).toBe("")
  expect(weightTextField.value).toBe("")

  // type 1000 into weight text field
  fireEvent.change(weightTextField, {target: { value: "1000"}})
  
  expect(heightTextField.value).toBe("")
  expect(weightTextField.value).toBe("1000")

  // select metric in the units dropdown
  const wrapperNode  = await screen.findByTestId('select-filled')
  const selectNode = wrapperNode.childNodes[0];
  fireEvent.mouseDown(selectNode);
  fireEvent.click(screen.getByText("Metric"));
  
  expect(heightTextField.value).toBe("")
  expect(weightTextField.value).toBe("453.592")
});