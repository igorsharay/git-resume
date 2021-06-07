import { PropTypes } from "prop-types";
import { Doughnut } from 'react-chartjs-2';
import { useMemo } from "react";

const LanguagesList = ({ languages, username }) => {
  const totalItems = Object.values(languages).reduce(
    (total, item) => total + item
  );

  const labels = useMemo(() =>
    Object.keys(languages).map(key => `${key} %`),
    [languages]
  );

  const data = useMemo(() =>
    Object.keys(languages).map(key => 
      Math.round((languages[key] / totalItems) * 100)
    ),
    [languages, totalItems]
  );

  const doughnutData = {
    labels,
    datasets: [
      {
        label: '% of Usage',
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(75, 192, 192, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(255, 159, 64, 0.3)',
          'rgba(205, 159, 24, 0.3)',
          'rgba(150, 13, 205, 0.3)',
          'rgba(100, 223, 18, 0.3)',
          'rgba(200, 238, 105, 0.3)',
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(75, 192, 192, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(255, 159, 64, 0.3)',
          'rgba(205, 159, 24, 0.3)',
          'rgba(150, 13, 205, 0.3)',
          'rgba(100, 223, 18, 0.3)',
          'rgba(200, 238, 105, 0.3)'
        ],
        borderColor: [
          'rgba(233, 236, 239, 1)'
        ],
        borderWidth: 2,
      },
    ]
  };

  return (
    <>
      <ul className="list-inline pl-0">
        {Object.keys(languages).map(key => (
          <li key={key} className="list-inline-item h6">
            <a
              href={`https://github.com/search?q=user%3A${username}&l=${encodeURIComponent(key)}`}
              target="_blank"
              rel="nofollow noreferrer">
              {key}
            </a>
            <span className="font-weight-normal">
              {" "}
              {`(${Math.round((languages[key] / totalItems) * 100)}%)`}
            </span>
          </li>
        ))}
      </ul>

      <div className="doughnut-container d-flex justify-content-center align-items-center">
        <div className="doughnut-chart">
          <Doughnut
            data={doughnutData}
            options={{
              plugins: {
                legend: {
                  display: false,
                }
              }
            }}
            />
        </div>
      </div>
    </>
  );
};

LanguagesList.propTypes = {
  languages: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};

export default LanguagesList;
