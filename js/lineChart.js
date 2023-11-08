/*
  Demonstrate how to create a line chart
*/

async function getData() {
  const acc = await fetch("./data/acc_by_kernel.csv");
  const loss = await fetch("./data/loss_by_kernel.csv");
  const accCsv = await acc.text();
  const lossCsv = await loss.text();

  /* The accCols and lossCols objects will follow the following structure:
    kernel: array of strings
    mean: array of means
  */
  const accData = {
    kernel: [],
    mean: []
  };
  const lossData = {
    kernel: [],
    mean: []
  };

  // \n = new line character
  // split('\n') will separate table into an array of individual rows
  // slice(start, end) - return a new array starting at index start
  //   up to but not including index end
  const accTable = accCsv.split("\n").slice(1);
  const lossTable = lossCsv.split("\n").slice(1);
  // console.log(table);

  accTable.forEach((row) => {
    const columns = row.split(","); // split each row on the commas
    const size = columns[0]; // assign kernel size
    accData.kernel.push(size); // push kernel size to accData.kernel array

    const acc = parseFloat(columns[1]);
    accData.mean.push(acc); // push mean accuracy to accData.mean array
  });
  lossTable.forEach((row) => {
    const columns = row.split(","); // split each row on the commas
    const size = columns[0]; // assign kernel size
    lossData.kernel.push(size); // push kernel size to lossData.kernel array

    const loss = parseFloat(columns[1]);
    lossData.mean.push(loss); // push mean accuracy to lossData.mean array
  });

  return {
    acc: accData,
    loss: lossData,
  };
}

async function createChart() {
  const data = await getData(); // createChart will wait until getData() is finished processing
  const accData = data.acc;
  const lossData = data.loss;
  
  const accCtx = document.getElementById("accChart");
  const lossCtx = document.getElementById("lossChart");

  const accChart = new Chart(accCtx, {
    type: "bar",
    data: {
      labels: accData.kernel,
      datasets: [
        {
          label: `Mean Accuracy`,
          data: accData.mean,
          fill: false,
          backgroundColor: "rgba(0, 100, 255, 0.5)",
          borderColor: "rgba(0, 100, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true, // Re-size based on screen size
      scales: {
        // Display options for x and y axes
        x: {
          title: {
            display: true,
            text: "Kernel Size", // x-axis title
            font: {
              size: 20,
            },
          },
          ticks: {
            font: {
              size: 16,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: "Mean Accuracy",
            font: {
              size: 20,
            },
          },
          ticks: {
            font: {
              size: 12,
            },
            maxTicksLimit: 20 // limit # of ticksg
          },
          min: 0.98,  // Start y-axis at 0.98
          max: 1      // End y-axis at 0.1
        },
      },
      plugins: {
        // Display options
        title: {
          display: true,
          text: "Mean Accuracy By Kernel Size",
          font: {
            size: 24,
          },
          padding: {
            top: 10,
            bottom: 30,
          },
        },
      },
    },
  });
  const lossChart = new Chart(lossCtx, {
    type: "bar",
    data: {
      labels: lossData.kernel,
      datasets: [
        {
          label: `Mean Loss`,
          data: lossData.mean,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true, // Re-size based on screen size
      scales: {
        // Display options for x and y axes
        x: {
          title: {
            display: true,
            text: "Kernel Size", // x-axis title
            font: {
              size: 20,
            },
          },
          ticks: {
            font: {
              size: 16,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: "Mean Loss",
            font: {
              size: 20,
            },
          },
          ticks: {
            font: {
              size: 12,
            },
          },
          min: 0,
          max: 0.09
        },
      },
      plugins: {
        // Display options
        title: {
          display: true,
          text: "Mean Loss By Kernel Size",
          font: {
            size: 24,
          },
          padding: {
            top: 10,
            bottom: 30,
          },
        },
      },
    },
  });

  
}

createChart();
