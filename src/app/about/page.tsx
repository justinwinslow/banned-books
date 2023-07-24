import './style.css';

export default function Donate() {
  return (
    <section className="view about">
      <div className="info">
        <h2>What is this?</h2>
        <p>
          With all the recent book banning in the US I realized there wasn't an easily searchable index of all the various bans. 
          So, I set out to create this to improve the transparency around our current censorious moment.
        </p>
        <h2>Credits</h2>
        <ul>
          <li>Ban data provided by <a href="https://pen.org/banned-in-the-usa/#what" target="_blank">PEN America</a></li>
          <li>Supplemental data provided <a href="https://openlibrary.org/" target="_blank">Open Library</a></li>
        </ul>
      </div>
      <div className="donate">
        <iframe 
          id='kofiframe' 
          src='https://ko-fi.com/justinwinslow/?hidefeed=true&widget=true&embed=true&preview=true' 
          height='712' 
          title='justinwinslow'
        ></iframe>
      </div>
    </section>
  )
}
