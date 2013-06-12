Imports System.IO

Public Module CreatingAndUpdatingLogFile
    Public Event OnError(ByVal exception As String)
    Public Sub WriteLogFile(ByVal clientInfo As String, ByVal status As String, ByVal printMsgNum As String, ByVal pirntMsg As String)
        Dim DilimS As String = " ,"
        Dim strData As String = (DateTime.Today & DilimS & TimeOfDay & DilimS & _
            clientInfo & DilimS & status & DilimS & printMsgNum & DilimS & pirntMsg & vbCrLf)
        Dim oReader As StreamWriter
        Try
            oReader = New StreamWriter(logFilePath, True)
            oReader.Write(strData)
            oReader.Close()
        Catch ex As Exception
            RaiseEvent OnError(ex.Message)
        End Try
    End Sub
End Module