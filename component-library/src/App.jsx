import Modal from "./components/Phase2/Modal/Modal";
import useModal from "./components/Phase2/Modal/useModal";

function App() {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <button onClick={open}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={close} size="md">
        <Modal.Header onClose={close}>
          Delete Account
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={close}>Cancel</button>
          <button>Delete</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App