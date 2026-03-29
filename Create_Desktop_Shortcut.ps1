$WshShell = New-Object -ComObject WScript.Shell
$DesktopPath = [System.IO.Path]::Combine([System.Environment]::GetFolderPath('Desktop'), "SETHU FC Billing Software.lnk")
$Shortcut = $WshShell.CreateShortcut($DesktopPath)

# Set the target securely to the new dynamically compiled native .exe
$Shortcut.TargetPath = [System.IO.Path]::Combine($PSScriptRoot, "SETHU FC BILLING.exe")
$Shortcut.WorkingDirectory = $PSScriptRoot
$Shortcut.WindowStyle = 1 # Normal window
$Shortcut.Description = "SETHU FC Billing Software"

# Use the newly generated custom rounded logo icon
$IconPath = [System.IO.Path]::Combine($PSScriptRoot, "assets", "images", "football_logo.ico")
if (Test-Path $IconPath) {
    $Shortcut.IconLocation = $IconPath
} else {
    $Shortcut.IconLocation = "shell32.dll, 13" # Fallback to Globe icon
}

$Shortcut.Save()

Write-Host "Desktop shortcut 'SETHU FC Billing Software' created successfully!" -ForegroundColor Green
Write-Host "You can now double-click it to launch the software." -ForegroundColor Cyan
pause
