	' This is a Server application programming code

Imports System.Threading
Imports System.Net
Imports System.Net.Sockets
Imports System.Text


Public Delegate Sub StatusInvoker(ByVal t As String)

    ' Programming code for main form is located within class Form1

Public Class Form1
    Private listenThread As Thread
    Private listener As TcpListener
    Private connectedClients As New Hashtable()

    ' When form loads, new thread is started were listening for active        
    ' TCP connections is done.
    ' Address of subroutine were listening is performed is passed.
    ' Interface window is updated with “Server Started”.
    ' Reading initialization file is called from here.

Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        listenThread = New Thread(AddressOf DoListen)
        listenThread.Start()
        Me.Invoke(New StatusInvoker(AddressOf Me.UpdateStatus), "Server Started")
        ReadFile()
    End Sub

    ' Actual listening of active TCP connections are performed here
    ' within an endless loop. 
    ' Printer starts TCP connection when Request push button is    
    ' pressed.
    ' Active TCP connections are accepted and Client applications are
    ' started.
    ' Events from open client applications are received and managed by
    ' calling associated procedures
    ' Interface window is updated with every new connection

    Private Sub DoListen()
        Try
            listener = New TcpListener(IPAddress.Any, 2443)
            listener.Start()
            Do
                Dim cl As New PrinterClient(listener.AcceptTcpClient)
                If Not connectedClients.Contains(cl.Name) Then
                    connectedClients.Add(cl.Name, cl)
                End If
                AddHandler cl.Disconnect, AddressOf OnDisconnect
                AddHandler cl.LineReceived, AddressOf OnLineReceived
                AddHandler cl.ErrorMsg, AddressOf OnError
                Me.Invoke(New StatusInvoker(AddressOf Me.UpdateStatus), cl.Name & ":Connected")
            Loop Until False
        Catch er As Exception
            WriteLogFile("DoListen", er.Message, "", "")
        End Try
    End Sub

    ' When response from connected printer is received as a string
    ' its contents is analyzed here.
    ' If response contains ESC/A035600601##/EOT as printer identity 
    ' message storage request is sent to get print message number in
    ' printer’s memory under number 001.
    ' When print message number is received 

    Private Sub OnLineReceived(ByVal sender As PrinterClient, ByVal strReturn As String)
        If strReturn.Contains("A035") Then
            sender.Send("S001?")
        End If
        If strReturn.Contains("S001" & Chr(27) & "u1") And IsNumeric(strReturn.Substring(8)) Or strReturn.Contains("-") Then
            Dim printMsgNum As String = strReturn.Substring(8, strReturn.Length - 8)
            sender.GetPrintMessage(printMsgNum)
            If Not sender.printMessage = Nothing Then
                Me.Invoke(New StatusInvoker(AddressOf Me.UpdateStatus), sender.Name & ":Print Message:" & printMsgNum & ":" & sender.printMessage)
                sender.Send("S001" & sender.printMessage)
                WriteLogFile(sender.Name, "ok", printMsgNum, sender.printMessage)
            Else
                Me.Invoke(New StatusInvoker(AddressOf Me.UpdateStatus), sender.Name & ":Print Message:" & printMsgNum & "NOTFOUND")
                sender.Send("S001" & printMsgNum & "NOTFOUND")
            End If
        End If
   End Sub

    Private Sub OnError(ByVal sender As PrinterClient, ByVal errmsg As String)
        Me.Invoke(New StatusInvoker(AddressOf Me.UpdateStatus), errmsg)
        WriteLogFile(sender.Name, "err", errmsg, "")
        GC.Collect()
    End Sub

    Private Sub UpdateStatus(ByVal t As String)
        If Not t.Length > 100 Then
            lstStatus.Items.Add(t)
        Else
            lstStatus.Items.Add(t.Substring(0, 100))
            lstStatus.Items.Add(t.Substring(100, t.Length - 100))
        End If
        lstStatus.SetSelected(lstStatus.Items.Count - 1, True)
    End Sub

    Public Sub OnDisconnect(ByVal sender As PrinterClient)
        Try
            If connectedClients.Contains(sender.Name) Then
                Me.Invoke(New StatusInvoker(AddressOf Me.UpdateStatus), sender.Name & ":Disconnected")
                connectedClients.Remove(sender.Name)
                sender.mClient.GetStream.Close()
                sender.mClient.Close()
                sender.s.Close()
            End If
        Catch ex As Exception
        End Try
        GC.Collect()
    End Sub

    Private Sub Form1_FormClosing(ByVal sender As System.Object, ByVal e As System.Windows.Forms.FormClosingEventArgs) Handles MyBase.FormClosing
        Try
            listener.Stop()
            listenThread.Abort()
            GC.Collect()
        Catch ex As Exception
        End Try
    End Sub

    Private Sub btnClear_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnClear.Click
        lstStatus.Items.Clear()
    End Sub
End Class