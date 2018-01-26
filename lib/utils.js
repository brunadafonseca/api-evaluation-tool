module.exports.updateBatchPerformance = (array) => {
  const redStudents = (array.filter(student => {
    const evaluations = student.evaluations
    const latestEvaluation = evaluations[evaluations.lenght-1]
    return latestEvaluation.color === 'red'
  }))

  const orangeStudents = (array.filter(student => {
    const evaluations = student.evaluations
    const latestEvaluation = evaluations[evaluations.lenght-1]
    return latestEvaluation.color === 'orange'
  }))

  const greenStudents = (array.filter(student => {
    const evaluations = student.evaluations
    const latestEvaluation = evaluations[evaluations.lenght-1]
    return latestEvaluation.color === 'green'
  }))

  const updatedBatchPerformance = {
    green: greenStudents,
    orange: orangeStudents,
    red: redStudents
  }

  return updatedBatchPerformance
}
