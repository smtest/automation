	' This is a Client application programming code
	
Imports System.Threading
Imports System.Net
Imports System.Net.Sockets
Imports System.Text
Imports Excel

Public Class PrinterClient
    Public Event Disconnect(ByVal sender As PrinterClient)
    Public Event LineReceived(ByVal sender As PrinterClient, ByVal Data As String)
    Public Event ErrorMsg(ByVal sender As PrinterClient, ByVal ErrMsg As String)
    Public mClient As TcpClient
    Public s As Socket
    Dim connInfo As IPEndPoint = CType(s.RemoteEndPoint, IPEndPoint)
    Private readBytes(1024) As Byte
    Private mText As New StringBuilder()
    Public printMessage As String

    Public Sub New(ByVal client As TcpClient)
        mClient = client
        s = mClient.Client
        mClient.GetStream.BeginRead(readBytes, 0, 1024, AddressOf DoStreamReceive, Nothing)
        Send("A?")
    End Sub

    Public ReadOnly Property Name() As String
        Get
            Return connInfo.ToString
        End Get
    End Property

    Private Sub DoStreamReceive(ByVal ar As IAsyncResult)
        Dim BytesRead As Integer
        Try
            SyncLock mClient.GetStream
                BytesRead = mClient.GetStream.EndRead(ar)
            End SyncLock
            If BytesRead < 1 Then
                RaiseEvent Disconnect(Me)
                Exit Sub
            End If
            BuildString(readBytes, 0, BytesRead)
            SyncLock mClient.GetStream
                mClient.GetStream.BeginRead(readBytes, 0, 1024, AddressOf DoStreamReceive, Nothing)
            End SyncLock
        Catch e As Exception
            RaiseEvent Disconnect(Me)
        End Try

    End Sub

    Private Sub BuildString(ByVal Bytes() As Byte, ByVal offset As Integer, ByVal count As Integer)
        For intIndex = offset To offset + count - 1
            If Bytes(intIndex) = 4 Or Bytes(intIndex) = 6 Then
                RaiseEvent LineReceived(Me, mText.ToString)
                mText = New StringBuilder()
            Else
                mText.Append(ChrW(Bytes(intIndex)))
            End If
        Next
    End Sub

    Public Sub Send(ByVal Data As String)
        SyncLock mClient.GetStream
            Dim w As New IO.StreamWriter(mClient.GetStream)
            w.Write(Chr(27) & Data & Chr(4))
            w.Flush()
        End SyncLock
    End Sub

    Public Sub GetPrintMessage(ByVal printMsgNum As String)
        Try
            Dim objExcel As New Excel.Application
            Dim objWorkbook As Excel.Workbook
            Dim objSheet As Excel.Worksheet
            objWorkbook = objExcel.Workbooks.Open(msgFilePath, ReadOnly:=True)
            objSheet = objWorkbook.Worksheets(Val(msgWorkSheet))
            objExcel.Visible = False
            Dim cellText As String
            Dim rowIndexMax As Integer = 2
            Dim colmnIndex As Integer = Val(printMsgNum)
            printMessage = Nothing
            Do
                cellText = objSheet.Cells(rowIndexMax, 1).value()
                rowIndexMax += 1
            Loop Until (cellText = "")
            For i As Integer = 2 To rowIndexMax
                If colmnIndex = objSheet.Cells(i, 1).Value Then
                    printMessage = objSheet.Cells(i, 2).Value
                    printMessage = printMessage.Replace(Chr(176), Chr(27) + "m1")
                    printMessage = printMessage.Replace("?U", Chr(27) + "m2")
                    printMessage = printMessage.Replace(timePrint, Chr(27) + "n1A" + "/" + Chr(27) + "n1G" + _
             "/" + Chr(27) + "n1E")
                    printMessage = printMessage.Replace(seqFootMarksPrint, Chr(27) + "j1N06000000999999000001NN000000000000N" + _
                    "ft")
                    printMessage = printMessage.Replace(seqMeterMarksPrint, Chr(27) + "j1N06000000999999000001NN000000000000N" + _
                    "m")
                    Exit For
                ElseIf i >= rowIndexMax Then
                End If
            Next
            objWorkbook.Close()
            objExcel.Quit()
            objSheet = Nothing
            objExcel = Nothing
            objWorkbook = Nothing
        Catch ex1 As System.IO.DirectoryNotFoundException
            RaiseEvent ErrorMsg(Me, "Drive not connected or file not found")
        Catch ex2 As Exception
            RaiseEvent ErrorMsg(Me, "GetPrintMessage: " & ex2.Message)
            GC.Collect()
        End Try
        GC.Collect()
    End Sub
End Class