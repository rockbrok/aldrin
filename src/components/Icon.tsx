import '../index.css';

const Icon = () => {
  return (
    <>
      <div id="icon">
        <div id="capsule">
          <div className="wings" />
          <div className="rectangle">
            <div className="oval bottom-oval white" />
          </div>
          <div id="cone">
            <div className="oval cone-oval bottom-oval" />
            <div className="cone-top" />
            <div id="block" className="block1" />
            <div id="block" className="block2" />
            <div id="block" className="block3" />
          </div>
          <div id="solar" className="solar-1">
            <div className="cell cell-left" />
            <div className="cell cell-bot-left" />
            <div className="cell cell-right" />
            <div className="cell cell-bot-right" />
          </div>
          <div id="solar" className="solar-2">
            <div className="cell cell-left" />
            <div className="cell cell-bot-left" />
            <div className="cell cell-right" />
            <div className="cell cell-bot-right" />
          </div>
          <div id="solar" className="solar-3">
            <div className="cell cell-left" />
            <div className="cell cell-bot-left" />
            <div className="cell cell-right" />
            <div className="cell cell-bot-right" />
          </div>
          <div id="solar" className="solar-4">
            <div className="cell cell-left" />
            <div className="cell cell-bot-left" />
            <div className="cell cell-right" />
            <div className="cell cell-bot-right" />
          </div>
        </div>
      </div>
    </>
  )
}

export { Icon }