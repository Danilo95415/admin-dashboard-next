import { Modal } from "react-bootstrap";

export default function BannerModel({ setDetailModal }) {
  <Modal
    className="modal-right"
    show={detailModal}
    onHide={() => setDetailModal(false)}
  >
    <Modal.Header closeButton>
      <Modal.Title as="h5">234523_4239.webp</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <img
        src="/img/product/small/product-2.webp"
        onClick={() => setIsLightboxOpen(true)}
        className="img-fluid rounded-md mb-4 cursor-pointer"
        alt="cornbread"
      />
      <div className="mb-3">
        <div className="text-small text-muted">TITLE</div>
        <div>234523_4239.webp</div>
      </div>
      <div className="mb-3">
        <div className="text-small text-muted">PATH</div>
        <div>/img/uploads/storage/234523_4239.webp</div>
      </div>
      <div className="mb-3">
        <div className="text-small text-muted">CREATED</div>
        <div>12.05.2021 - 13:42</div>
      </div>
      <div className="mb-3">
        <div className="text-small text-muted">SIZE</div>
        <div>259 KB</div>
      </div>
      <div className="mb-3">
        <div className="text-small text-muted">TYPE</div>
        <div>Jpeg</div>
      </div>
      <div className="mb-3">
        <div className="text-small text-muted">RESOLUTION</div>
        <div>1920x1080</div>
      </div>
    </Modal.Body>
    {/* <Modal.Footer>
      <Button variant="outline-primary" className="btn-icon btn-icon-only" onClick={() => setDetailModal(false)}>
        <CsLineIcons icon="bin" />
      </Button>
      <Button variant="outline-primary" className="btn-icon btn-icon-only" onClick={() => setDetailModal(false)}>
        <CsLineIcons icon="shortcut" />
      </Button>
      <Button className="btn-icon btn-icon-end" onClick={() => setDetailModal(false)}>
        <span>Use</span> <CsLineIcons icon="check-square" />
      </Button>
    </Modal.Footer> */}
  </Modal>;
}
