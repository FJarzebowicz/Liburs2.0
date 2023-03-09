export default function ClosestEvents() {
  return (
    <div className="closestEvents">
      <div className="todayEvents__container">
        <div className="todayEvents__header">Co się dzisiaj dzieje ?</div>
        <ul className="todayEvents__list ">
          <li className="todayEvents__event col-1-of-2">
            <div className="todayEvents__event-photoContainer todayEvents__event-photoContainer-teal"></div>
            <div className="todayEvents__event-title">Sprawdzian</div>
            <div className="todayEvents__event-subject">Biologia</div>
          </li>
          <li className="todayEvents__event col-1-of-2 ">
            <div className="todayEvents__event-photoContainer todayEvents__event-photoContainer-blue"></div>
            <div className="todayEvents__event-title">Kartówka </div>
            <div className="todayEvents__event-subject">Niemiecki</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
