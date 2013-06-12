	
Imports System.IO

Public Module ReadINIFile
    Public msgFilePath As String
    Public msgWorkSheet As String
    Public logFilePath As String
    Public timePrint As String
    Public seqFootMarksPrint As String
    Public seqMeterMarksPrint As String

    Public Sub ReadFile()
        Try
            Dim iniFile As New StreamReader("C:\DominoPrint\DominoPrint.INI")
            Dim sLine As String
            Do
                sLine = iniFile.ReadLine
                If Not sLine Is Nothing Then
                    If sLine.Contains("path=") Then
                        msgFilePath = sLine.Substring(5, sLine.Length - 5)
                    End If
                    If sLine.Contains("worksheet=") Then
                        msgWorkSheet = sLine.Substring(10, sLine.Length - 10)
                    End If
                    If sLine.Contains("logfile=") Then
                        logFilePath = sLine.Substring(8, sLine.Length - 8)
                    End If
                    If sLine.Contains("timestring=") Then
                        timePrint = sLine.Substring(11, sLine.Length - 11)
                    End If
                    If sLine.Contains("seqfootmarks=") Then
                        seqFootMarksPrint = sLine.Substring(13, sLine.Length - 13)
                    End If
                    If sLine.Contains("seqmetermarks=") Then
                        seqMeterMarksPrint = sLine.Substring(14, sLine.Length - 14)
                    End If
                End If
            Loop Until sLine Is Nothing
            iniFile.Close()
        Catch ex As Exception
        End Try
    End Sub

End Module