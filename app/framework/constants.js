export default {
  applicationScope: {
    grading: 'Grading',
    onla: 'Onla',
    onlr: 'Onlr'
  },

  idStatus: {
    evaluationUntil: 10240, // Beurteilung bis
    controlOfEvaluation: 10250, // ueberpruefung der Beurteilung
    intermediateEvaluation: 10300, // Zwischenbewertung
    intermediateEvaluationDefinite: 10305, // Zwischenbeurteilung definitiv
    lowestModuleEventStatus: 10215, // a.In Planung
    highestModuleEventStatus: 10310 // a.Zwischenbeurteilung abschliessen
  },

  vssType: {
    IntField: 277,
    Currency: 279,
    Text: 290,
    YesNo: 291,
    Yes: 292,
    MemoText: 293,
    Date: 295
  },

  vssStyle: {
    Header: 'HE',
    Remark: 'BE',
    File: 'PD',
    Foto: 'PF',
    Combobox: 'CB'
  },

  vssInternet: {
    ReadOnly: 'R',
    required: 'M',
    hidden: 'H',
    edit: 'E'
  }
};
