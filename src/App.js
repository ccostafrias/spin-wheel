import React, { useState, useEffect } from 'react'

import SpinWheel from "./pages/SpinWheel"
import { ToastContainer } from 'react-toastify'

export default function App() {

  return (
    <>
      <SpinWheel />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        // transition={Bounce}
      />
    </>
  )
}
