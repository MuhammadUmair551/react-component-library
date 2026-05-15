import React, { useCallback, useState } from 'react'

function useModal(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(p => !p), []);

    return { open, close, toggle, isOpen }
}

export default useModal
